import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useShinobiPro } from '../hooks/useShinobiPro.js';
import MangekyoProIcon from './icons/MangekyoProIcon.js';
import { quizQuestions } from '../data/quiz.js';
import AkatsukiThemeIcon from './icons/AkatsukiThemeIcon.js';
import SecretCodeIcon from './icons/SecretCodeIcon.js';
import RinneganIcon from './icons/RinneganIcon.js';
import RinneSharinganIcon from './icons/RinneSharinganIcon.js';
import SharinganIcon from './icons/SharinganIcon.js';
import SageWisdomIcon from './icons/SageWisdomIcon.js';


const SecretCodeModal = ({
    onClose,
    onSubmit,
}) => {
    const [code, setCode] = useState('');
    const [status, setStatus] = useState('idle');

    const handleKeyPress = (key) => {
        if (status === 'idle' && code.length < 13) {
             setCode(prev => prev + key);
        }
    };

    const handleBackspace = () => {
        if (status !== 'idle') return;
        setCode(prev => prev.slice(0, -1));
    };

    useEffect(() => {
        if (status !== 'idle') return;

        const validCodes = ['13579001', '1357913579001'];
        if (validCodes.includes(code)) {
            const result = onSubmit(code);
            if (result.startsWith('success')) {
                setStatus('success');
                setTimeout(() => onClose(), 1200);
            }
        } else if (code.length >= 13) { // Longest valid code is 13
            setStatus('failure');
            setTimeout(() => {
                setStatus('idle');
                setCode('');
            }, 800);
        }
    }, [code, status, onSubmit, onClose]);
    
    return React.createElement(
        'div',
        { className: "secret-code-modal-bg flex items-center justify-center", onClick: onClose },
        React.createElement(
            'div',
            {
                className: `secret-code-container w-full max-w-sm ${status === 'failure' ? 'secret-code-failure' : ''}`,
                onClick: (e) => e.stopPropagation()
            },
            React.createElement(
                'div',
                { className: "text-center" },
                React.createElement(SecretCodeIcon, { className: "w-12 h-12 mx-auto text-purple-400 mb-4" }),
                React.createElement('h3', { className: "font-cairo text-2xl font-bold mb-2" }, "أدخل الكود السري")
            ),
             React.createElement(
                'div',
                { className: status === 'success' ? 'secret-code-success' : '' },
                React.createElement(
                    'div', { className: "secret-code-display flex items-center justify-center transition-all duration-300" },
                    React.createElement('span', null, code || '...')
                ),
                React.createElement(
                    'div', { className: "secret-code-keypad" },
                    ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                        React.createElement('button', { key: num, onClick: () => handleKeyPress(num), className: "keypad-button", disabled: status !== 'idle' }, num)
                    )),
                     React.createElement('button', { onClick: () => handleKeyPress('0'), className: "keypad-button col-start-2", disabled: status !== 'idle' }, '0'),
                     React.createElement('button', { onClick: handleBackspace, className: "keypad-button", disabled: status !== 'idle' },
                        React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
                          React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 002.828 0L21 12M3 12l6.414-6.414a2 2 0 012.828 0L21 12" })
                        )
                     )
                )
            )
        )
    );
};

const InfiniteTsukuyomiFailureScene = ({ onAnimationEnd }) => {
    useEffect(() => {
        const timer = setTimeout(onAnimationEnd, 6000);
        return () => clearTimeout(timer);
    }, [onAnimationEnd]);

    return React.createElement(
        'div',
        { className: "tsukuyomi-failure-scene" },
        React.createElement(
            'div',
            { className: "tsukuyomi-moon" },
            React.createElement(RinneSharinganIcon, { className: "rinne-sharingan-overlay" })
        ),
        React.createElement(
            'div',
            { className: "tsukuyomi-text-container" },
            React.createElement(
                'h2',
                { className: "tsukuyomi-text text-4xl sm:text-5xl font-black" },
                "وقعت في الغينجتسو الأبدي..."
            ),
            React.createElement(
                'p',
                { className: "tsukuyomi-subtext font-tajawal text-lg mt-2" },
                "استيقظ على الواقع وحاول مجدداً."
            )
        )
    );
};


const QuizModal = ({ onComplete }) => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerStatus, setAnswerStatus] = useState('idle');
    const [revealedCorrectAnswer, setRevealedCorrectAnswer] = useState(null);
    const [showFailure, setShowFailure] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [hintsRemaining, setHintsRemaining] = useState(2);
    const [isCodeInputOpen, setIsCodeInputOpen] = useState(false);

    const shuffleQuestions = useCallback(() => {
        const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
        setQuestions(shuffled.slice(0, 5)); // Use 5 random questions
    }, []);

    useEffect(() => {
        shuffleQuestions();
    }, [shuffleQuestions]);

    const resetQuiz = () => {
        setShowFailure(false);
        shuffleQuestions();
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setAnswerStatus('idle');
        setRevealedCorrectAnswer(null);
        setShowHint(false);
        setHintsRemaining(2);
    };

    const handleNextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setAnswerStatus('idle');
            setShowHint(false);
        } else {
            onComplete();
        }
    }

    const handleAnswer = (option) => {
        if (answerStatus !== 'idle') return;

        setSelectedAnswer(option);
        const currentQ = questions[currentIndex];
        const isCorrect = option === currentQ.correctAnswer;

        if (isCorrect) {
            setAnswerStatus('correct');
            setTimeout(handleNextQuestion, 1500);
        } else {
            setAnswerStatus('incorrect');
            setTimeout(() => setRevealedCorrectAnswer(currentQ.correctAnswer), 500);
            setTimeout(() => setShowFailure(true), 1500);
        }
    };
    
     const handleCodeSubmit = (code) => {
        if (code === '13579001') {
            const currentQ = questions[currentIndex];
            if (currentQ) {
                handleAnswer(currentQ.correctAnswer);
            }
            return 'success-solve';
        }
        if (code === '1357913579001') {
            onComplete();
            return 'success-skip';
        }
        return 'failure';
    };

    const handleUseHint = () => {
        if (hintsRemaining > 0 && !showHint) {
            setHintsRemaining(prev => prev - 1);
            setShowHint(true);
        }
    };

    if (questions.length === 0) return null;

    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex) / questions.length) * 100;

    return React.createElement(
        'div', { className: `quiz-modal-container fixed inset-0 z-[60] flex flex-col items-center justify-center p-4 sm:p-8 bg-black transition-all duration-500 ${showFailure ? 'is-failing' : ''}` },
        React.createElement('div', { className: "absolute inset-0 z-[-1] overflow-hidden" },
            React.createElement('div', { className: "absolute inset-0 bg-gradient-to-t from-red-900/50 via-black to-black opacity-70" }),
            React.createElement(RinneganIcon, { className: "rotating-rinnegan-bg absolute -bottom-1/4 -left-1/4 w-3/4 h-3/4 text-red-900/40" }),
            React.createElement(MangekyoProIcon, { className: "absolute -top-1/4 -right-1/4 w-3/4 h-3/4 text-red-900/40 animate-spin [animation-duration:40s] [animation-direction:reverse]" }),
            React.createElement(SharinganIcon, { className: "quiz-bg-sharingan" })
        ),
        isCodeInputOpen && React.createElement(SecretCodeModal, { onClose: () => setIsCodeInputOpen(false), onSubmit: handleCodeSubmit }),
        React.createElement('div', { className: "w-full max-w-4xl mx-auto flex flex-col flex-grow relative" },
            React.createElement('div', { className: "w-full max-w-lg mx-auto my-4" },
                React.createElement('div', { className: "flex justify-between items-center mb-2 px-2" },
                    React.createElement('button', { onClick: handleUseHint, disabled: hintsRemaining === 0 || showHint, className: "quiz-hint-button", title: "استخدام تلميح" },
                        React.createElement(SageWisdomIcon, { className: "w-6 h-6" }),
                        React.createElement('span', { className: "font-semibold" }, "تلميح"),
                        React.createElement('span', { className: "hint-counter" }, hintsRemaining)
                    ),
                    React.createElement('div', { className: "text-sm font-bold text-gray-300" },
                        React.createElement('span', null, `السؤال ${currentIndex + 1} / ${questions.length}`)
                    )
                ),
                React.createElement('div', { className: "quiz-progress-bar h-4" },
                    React.createElement('div', { className: "quiz-progress-bar-inner", style: { width: `${progress}%` } })
                )
            ),
            React.createElement('div', { className: "flex-grow flex flex-col items-center justify-center text-center" },
                showHint && React.createElement('div', { className: "hint-chakra-aura mb-6 max-w-2xl mx-auto" },
                    React.createElement('p', { className: "text-lg text-amber-300 font-semibold" },
                        React.createElement('span', { className: "font-bold" }, "تلميح: "), currentQuestion.hint
                    )
                ),
                React.createElement('h2', { className: "text-3xl md:text-5xl font-bold mb-10 font-cairo" }, currentQuestion.question),
                React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-4 w-full" },
                    currentQuestion.options.map((option) => {
                        const isSelected = selectedAnswer === option;
                        const isCorrect = revealedCorrectAnswer === option;
                        let buttonClass = 'bg-black/40 hover:bg-black/70 border-gray-700 hover:border-red-700';
                        if (answerStatus !== 'idle') {
                            if (isSelected && answerStatus === 'correct') {
                                buttonClass = 'bg-green-600/80 border-green-400 animate-[correct-answer-anim_1s_ease-in-out]';
                            } else if (isCorrect) {
                                buttonClass = 'bg-green-600/80 border-green-400';
                            } else if (isSelected && answerStatus === 'incorrect') {
                                buttonClass = 'bg-red-800/80 border-red-500 animate-[incorrect-answer-anim_0.5s_ease-in-out]';
                            } else {
                                 buttonClass = 'bg-black/20 border-gray-800 text-gray-500';
                            }
                        }
                       
                        return React.createElement('button', { key: option, onClick: () => handleAnswer(option), disabled: answerStatus !== 'idle', className: `p-5 text-xl rounded-lg font-semibold transition-all duration-300 w-full text-right border-2 ${buttonClass}` }, option);
                    })
                )
            ),
             React.createElement('div', { className: "mt-auto pt-4 text-center" },
                React.createElement('button', { onClick: () => setIsCodeInputOpen(true), className: "flex items-center gap-2 mx-auto px-4 py-2 rounded-lg bg-purple-900/40 border border-purple-700/50 text-purple-300 hover:bg-purple-900/80 hover:text-purple-200 transition-all shadow-lg", title: "إدخال الكود السري" },
                    React.createElement(SecretCodeIcon, { className: "w-5 h-5" }),
                    React.createElement('span', { className: "font-semibold" }, "الكود السري")
                ),
                React.createElement('p', { className: "text-sm text-gray-500 mt-4" }, `أجب على ${questions.length} أسئلة لتثبت جدارتك. (${currentIndex + 1}/${questions.length})`)
            )
        ),
        showFailure && React.createElement(InfiniteTsukuyomiFailureScene, { onAnimationEnd: resetQuiz })
    );
};

const chakraWisps = [
    { color: '#f87171', angle: 20, delay: 1.5 },
    { color: '#fb923c', angle: 300, delay: 1.6 },
    { color: '#facc15', angle: 120, delay: 1.7 },
    { color: '#a3e635', angle: 70, delay: 1.8 },
    { color: '#4ade80', angle: 210, delay: 1.9 },
    { color: '#22d3ee', angle: 180, delay: 2.0 },
    { color: '#818cf8', angle: 250, delay: 2.1 },
    { color: '#c084fc', angle: 340, delay: 2.2 },
];

const SixPathsAwakeningScene = ({ onComplete }) => {
    const { setIsActivating } = useShinobiPro();
    const [stage, setStage] = useState('void');
    const [capturedWisps, setCapturedWisps] = useState(new Set());
    const timeoutRef = useRef(null);
  
    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        const speedBoost = capturedWisps.size * 400; // 400ms boost per wisp
        let nextStage = null;
        let delay = 0;

        switch (stage) {
            case 'void':      delay = 1500; nextStage = 'gathering'; break;
            case 'gathering': delay = 2500 - speedBoost; nextStage = 'unveiling'; break;
            case 'unveiling': delay = 4000 - speedBoost; nextStage = 'ascension'; break;
            case 'ascension': delay = 1500 - (speedBoost / 2); nextStage = 'aftermath'; break;
            case 'aftermath': delay = 3000; nextStage = 'complete'; break;
        }

        if (nextStage) {
            timeoutRef.current = setTimeout(() => {
                if (nextStage === 'complete') {
                    setIsActivating(false);
                    onComplete();
                } else {
                    setStage(nextStage);
                }
            }, Math.max(200, delay));
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [stage, onComplete, setIsActivating, capturedWisps.size]);

    const handleWispClick = (wispAngle) => {
        if (stage !== 'gathering' || capturedWisps.has(wispAngle)) return;
        setCapturedWisps(prev => new Set(prev).add(wispAngle));
    };
  
    return React.createElement('div', { className: "awakening-scene-bg" },
        React.createElement('div', { className: `awakening-container` },
            stage === 'void' && React.createElement('div', { className: "truth-seeking-orb" }),
            stage === 'gathering' && React.createElement(React.Fragment, null,
                React.createElement('div', { className: "truth-seeking-orb" }),
                chakraWisps.map(wisp => React.createElement('div', { 
                    key: wisp.angle, 
                    className: `chakra-wisp interactive ${capturedWisps.has(wisp.angle) ? 'captured' : ''}`,
                    onClick: () => handleWispClick(wisp.angle),
                    style: { '--wisp-color': wisp.color, '--angle': `${wisp.angle}deg`, animationDelay: `${wisp.delay}s` } 
                }))
            ),
            stage === 'unveiling' && React.createElement('div', { className: "awakening-rinnegan-container", style: { animationDelay: '0s' } },
                React.createElement(RinneganIcon, { className: "awakening-rinnegan" })
            ),
            stage === 'ascension' && React.createElement(React.Fragment, null,
                React.createElement('div', { className: "awakening-rinnegan-container" },
                    React.createElement(RinneganIcon, { className: "awakening-rinnegan" })
                ),
                React.createElement('div', { className: "shakujo-staff" }),
                React.createElement('div', { className: "truth-seeking-orbs-container" },
                    [...Array(6)].map((_, i) => {
                        const angle = i * 60;
                        const radius = 40; // Percentage
                        const x = radius * Math.cos(angle * Math.PI / 180);
                        const y = radius * Math.sin(angle * Math.PI / 180);
                        return React.createElement('div', { 
                            key: i, 
                            className: "awakening-orb",
                            style: {'--transform-end': `translate(${x}%, ${y}%)`, animationDelay: `${6 + i*0.1}s`}
                        });
                    })
                )
             )
        ),
        stage === 'ascension' && React.createElement('div', { className: "ascension-flash", style:{animationDelay: '1.5s'}}),
        stage === 'aftermath' && React.createElement('div', { className: "awakening-aftermath" },
            React.createElement('div', { className: "awakening-text" },
                React.createElement('h2', { className: "font-cairo text-4xl sm:text-5xl font-black" }, "لقد بلغت حكمة المسارات الستة"),
                React.createElement('p', { className: "font-tajawal text-lg text-amber-600 mt-2" }, "عالم الشينوبي الحقيقي ينكشف أمامك.")
            )
        ),
        stage === 'gathering' && React.createElement('div', { className: "awakening-prompt" }, "انقر على خيوط التشاكرا لجمعها!")
    );
};

const ShinobiPro = () => {
    const { isPro, activatePro, isActivating, setIsActivating, isAkatsukiTheme, toggleAkatsukiTheme } = useShinobiPro();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = ReactRouterDOM.useNavigate();
    const location = ReactRouterDOM.useLocation();

    const showButtons = location.pathname !== '/timeline';

    const handleCompleteQuiz = useCallback(() => {
        setIsModalOpen(false);
        activatePro();
        setIsActivating(true);
    }, [activatePro, setIsActivating]);

    const handleActivationComplete = () => {
        navigate('/pro');
    };

    const ProButtonContent = useMemo(() => {
        if (isPro) {
            return React.createElement(
                React.Fragment, null,
                React.createElement(MangekyoProIcon, { className: "w-12 h-12 text-yellow-400 pro-icon-active" }),
                React.createElement('span', { className: "font-cairo font-black text-white" }, "شينوبي برو مفعل")
            );
        }
        return React.createElement(
            React.Fragment, null,
            React.createElement(MangekyoProIcon, { className: "w-12 h-12 group-hover:rotate-90 transition-transform duration-500" }),
            React.createElement('span', { className: "font-cairo font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-300 to-red-400 group-hover:from-purple-200 group-hover:to-red-300" }, "شينوبي برو")
        );
    }, [isPro]);

    return React.createElement(
        React.Fragment, null,
        showButtons && React.createElement(
            React.Fragment, null,
            React.createElement('div', { className: `fixed top-4 left-4 z-50` },
                React.createElement('button', {
                    onClick: () => (isPro ? navigate('/pro') : setIsModalOpen(true)),
                    className: `group flex items-center gap-4 p-2 pr-5 rounded-full border-2 backdrop-blur-sm transition-all duration-300 min-w-[280px] justify-start ${isPro ? 'pro-button-unreal shadow-[0_0_15px_#a855f7]' : 'pro-button-dormant'}`,
                    title: isPro ? "عرض مزايا برو" : "فعّل شينوبي برو"
                },
                React.createElement('div', { className: "pro-button-content flex items-center gap-3" }, ProButtonContent)
                )
            ),
            isPro && React.createElement('div', { className: `fixed bottom-4 left-4 z-50` },
                React.createElement('button', { 
                    onClick: toggleAkatsukiTheme, 
                    title: "تفعيل مظهر الأكاتسوكي", 
                    className: `group w-16 h-16 flex items-center justify-center rounded-full border-2 backdrop-blur-sm transition-all duration-300 pro-button-akatsuki shadow-[0_0_15px_#ef4444]`,
                    "aria-pressed": isAkatsukiTheme
                },
                React.createElement(AkatsukiThemeIcon, { className: `w-10 h-10 transition-transform duration-1000 ${isAkatsukiTheme ? 'animate-continuous-rotate' : ''}`, style:{animationDuration: '3s'} })
                )
            )
        ),
        isModalOpen && React.createElement(QuizModal, { onComplete: handleCompleteQuiz }),
        isActivating && React.createElement(SixPathsAwakeningScene, { onComplete: handleActivationComplete })
    );
};

export default ShinobiPro;
