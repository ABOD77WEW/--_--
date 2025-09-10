import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { arcs } from '../data/arcs.js';
import FullScreenDetailView from '../components/FullScreenDetailView.js';
import { useFavorites } from '../hooks/useFavorites.js';
import InkBlotIcon from '../components/icons/InkBlotIcon.js';

const TimelineEvent = ({ arc, onSelect, style, infoPosition }) => {
    const eventRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                root: null,
                rootMargin: '0px 0px 0px -200px',
                threshold: 0.5,
            }
        );

        if (eventRef.current) {
            observer.observe(eventRef.current);
        }

        return () => {
            if (eventRef.current) {
                observer.unobserve(eventRef.current);
            }
        };
    }, []);

    return React.createElement(
        'div',
        { ref: eventRef, className: `timeline-scroll-event ${isVisible ? 'is-visible' : ''}`, style: style },
        React.createElement(
            'div',
            {
                className: "timeline-event-marker",
                onClick: onSelect,
                role: "button",
                tabIndex: 0,
                "aria-label": `عرض تفاصيل ${arc.name}`
            },
            React.createElement(InkBlotIcon, { className: "ink-blot" }),
            React.createElement('div', { className: "emoji" }, arc.emoji)
        ),
        React.createElement(
            'div',
            { className: `timeline-event-info ${infoPosition}` },
            React.createElement('h3', { className: "font-cairo font-bold text-lg" }, arc.name),
            React.createElement('p', { className: "text-sm font-semibold opacity-80 font-mono tracking-tighter" }, arc.episodeRange)
        )
    );
};

const TimelineDetails = ({ arc }) => {
    const { toggleFavorite, isFavorite } = useFavorites();
    const favorite = isFavorite(arc.id, 'arcs');

    return React.createElement(
        'div',
        { className: "w-full text-center p-4" },
        React.createElement(
            'button',
            {
                onClick: (e) => { e.stopPropagation(); toggleFavorite(arc, 'arcs'); },
                className: "absolute top-6 left-6 z-10 p-3 rounded-full bg-black/30 hover:bg-yellow-500/50 transition-colors duration-300 backdrop-blur-sm",
                "aria-label": "إضافة للمفضلة"
            },
            React.createElement(
                'svg',
                { xmlns: "http://www.w3.org/2000/svg", className: `h-6 w-6 transition-colors ${favorite ? 'text-yellow-400 fill-current' : 'text-white'}`, viewBox: "0 0 20 20", fill: "currentColor" },
                React.createElement('path', { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
            )
        ),
        React.createElement(
            'div',
            { className: "mx-auto w-40 h-40 flex items-center justify-center rounded-lg bg-gray-700/50 mb-6 border-4 border-gray-600" },
            React.createElement('span', { className: "text-9xl" }, arc.emoji)
        ),
        React.createElement('h2', { className: "font-cairo text-4xl font-bold mb-2" }, arc.name),
        React.createElement('p', { className: "font-mono text-lg text-gray-400 mb-6" }, arc.episodeRange),
        React.createElement('p', { className: "text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto" }, arc.summary)
    );
};

const TimelinePage = () => {
    const [selectedArc, setSelectedArc] = useState(null);
    const scrollContainerRef = useRef(null);
    const navigate = ReactRouterDOM.useNavigate();

    const EVENT_SPACING = 300;
    const Y_POSITIONS = [100, 300]; 
    const MARKER_SIZE = 96;
    const trackWidth = arcs.length * EVENT_SPACING;
    const trackHeight = 500;
    
    const pathData = useMemo(() => {
        let d = `M ${EVENT_SPACING / 2} ${Y_POSITIONS[0] + MARKER_SIZE / 2}`;
        for(let i=1; i < arcs.length; i++) {
            const x = i * EVENT_SPACING + EVENT_SPACING / 2;
            const y = Y_POSITIONS[i % 2] + MARKER_SIZE / 2;
            const prev_x = (i-1) * EVENT_SPACING + EVENT_SPACING / 2;
            const prev_y = Y_POSITIONS[(i-1) % 2] + MARKER_SIZE / 2;
            
            const cx1 = prev_x + EVENT_SPACING / 2;
            const cy1 = prev_y;
            const cx2 = prev_x + EVENT_SPACING / 2;
            const cy2 = y;
            d += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x} ${y}`;
        }
        return d;
    }, [arcs.length]);

    useEffect(() => {
        const slider = scrollContainerRef.current;
        if (!slider) return;

        slider.scrollLeft = 0;

        let isDown = false;
        let startX;
        let scrollLeft;

        const handleMouseDown = (e) => {
          isDown = true;
          slider.classList.add('active');
          startX = e.pageX - slider.offsetLeft;
          scrollLeft = slider.scrollLeft;
        };

        const handleMouseLeave = () => {
          isDown = false;
          slider.classList.remove('active');
        };

        const handleMouseUp = () => {
          isDown = false;
          slider.classList.remove('active');
        };

        const handleMouseMove = (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - slider.offsetLeft;
          const walk = (x - startX) * 2; 
          slider.scrollLeft = scrollLeft - walk;
        };
        
        const handleWheel = (e) => {
            if (e.deltaY === 0) return;
            e.preventDefault();
            slider.scrollLeft += e.deltaY;
        };

        slider.addEventListener('mousedown', handleMouseDown);
        slider.addEventListener('mouseleave', handleMouseLeave);
        slider.addEventListener('mouseup', handleMouseUp);
        slider.addEventListener('mousemove', handleMouseMove);
        slider.addEventListener('wheel', handleWheel);

        return () => {
          slider.removeEventListener('mousedown', handleMouseDown);
          slider.removeEventListener('mouseleave', handleMouseLeave);
          slider.removeEventListener('mouseup', handleMouseUp);
          slider.removeEventListener('mousemove', handleMouseMove);
          slider.removeEventListener('wheel', handleWheel);
        };
    }, []);
    

    return React.createElement(
      'div',
      { className: "timeline-scroll-container" },
      React.createElement(
        'button',
        {
            onClick: () => navigate('/features'),
            className: "timeline-exit-button",
            "aria-label": "إغلاق المخطط الزمني",
            title: "العودة إلى الخصائص"
        },
        React.createElement(
            'svg',
            { xmlns: "http://www.w3.org/2000/svg", className: "h-7 w-7", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 3 },
            React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" })
        )
      ),
      React.createElement(
        'div',
        { className: "relative z-10 p-6 text-center animate-[cinematic-fade-in_1s]" },
        React.createElement('h1', { className: "font-cairo text-4xl font-black text-[#4a2e2e]" }, "مخطوطة تاريخ الشينوبي"),
        React.createElement('p', { className: "text-[#6b4f4f] font-semibold" }, "اسحب أفقيًا أو استخدم عجلة الفأرة لاستكشاف رحلة ناروتو وأحداثها العظيمة.")
      ),
      React.createElement(
        'div',
        { ref: scrollContainerRef, className: "timeline-map-scroller" },
        React.createElement(
          'div',
          { className: "timeline-map-content", style: { width: `${trackWidth}px`, height: `${trackHeight}px` } },
          React.createElement(
            'svg',
            { className: "timeline-path-svg", width: trackWidth, height: trackHeight },
            React.createElement('path', { d: pathData, strokeDashoffset: "0" })
          ),
          arcs.map((arc, index) => React.createElement(TimelineEvent, {
            key: arc.id,
            arc: arc,
            onSelect: () => setSelectedArc(arc),
            style: {
              left: `${index * EVENT_SPACING + (EVENT_SPACING - MARKER_SIZE) / 2}px`,
              top: `${Y_POSITIONS[index % 2]}px`
            },
            infoPosition: index % 2 === 0 ? 'bottom' : 'top'
          }))
        )
      ),
      React.createElement(
        FullScreenDetailView,
        { show: !!selectedArc, onClose: () => setSelectedArc(null) },
        selectedArc && React.createElement(TimelineDetails, { arc: selectedArc })
      )
    );
};

export default TimelinePage;
