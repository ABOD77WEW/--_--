import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { arcs } from '../data/arcs.js';
import InkBlotIcon from '../components/icons/InkBlotIcon.js';

const TimelineEvent = ({ arc, style, infoPosition, scrollContainerRef }) => {
    const eventRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const scrollRoot = scrollContainerRef.current;
        const currentRef = eventRef.current;
        if (!currentRef || !scrollRoot) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                root: scrollRoot,
                rootMargin: '0px -100px 0px -100px',
                threshold: 0.1,
            }
        );

        observer.observe(currentRef);

        return () => {
             if (currentRef) {
                observer.unobserve(currentRef);
            }
            observer.disconnect();
        };
    }, [scrollContainerRef]);

    return React.createElement(
        'div',
        { ref: eventRef, className: `timeline-scroll-event ${isVisible ? 'is-visible' : ''}`, style: style },
        React.createElement(
            'div',
            {
                className: "timeline-event-marker",
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

const TimelinePage = () => {
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
    }, []);

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
            style: {
              left: `${index * EVENT_SPACING + (EVENT_SPACING - MARKER_SIZE) / 2}px`,
              top: `${Y_POSITIONS[index % 2]}px`
            },
            infoPosition: index % 2 === 0 ? 'bottom' : 'top',
            scrollContainerRef: scrollContainerRef
          }))
        )
      )
    );
};

export default TimelinePage;
