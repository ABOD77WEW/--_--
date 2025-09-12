import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
// FIX: Replaced named imports with a namespace import for 'react-router-dom' to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { useShinobiPro } from '../hooks/useShinobiPro';
import MangekyoProIcon from './icons/MangekyoProIcon';
import { quizQuestions } from '../data/quiz';
import { QuizQuestion } from '../types';
import AkatsukiThemeIcon from './icons/AkatsukiThemeIcon';
import SecretCodeIcon from './icons/SecretCodeIcon';
import RinneganIcon from './icons/RinneganIcon';
import RinneSharinganIcon from './icons/RinneSharinganIcon';
import SharinganIcon from './icons/SharinganIcon';


type AnswerStatus = 'idle' | 'correct' | 'incorrect';

const SecretCodeModal: React.FC<{
    onClose: () => void;
    onSubmit: (code: string) => 'success-hint' | 'success-solve' | 'success-skip' | 'failure';
}> = ({ onClose, onSubmit }) => {
    const [code, setCode] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'failure'>('idle');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Auto-submit on correct code
    useEffect(() => {
        if (status !== 'idle') return;

        const validCodes = ['112244', '13579001', '1357913579001'];
        if (validCodes.includes(code)) {
            const result = onSubmit(code);
            if (result.startsWith('success')) {
                setStatus('success');
                setTimeout(() => onClose(), 1200);
            }
        }
    }, [code, status, onSubmit, onClose]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (status !== 'idle' || !code) return;

        const validCodes = ['112244', '13579001', '1357913579001'];
        if (!validCodes.includes(code)) {
            setStatus('failure');
            setTimeout(() => {
                setStatus('idle');
                setCode('');
            }, 800);
        }
    };
    
    return (
        <div className="secret-code-modal-bg flex items-center justify-center" onClick={onClose}>
            <div
                className={`secret-code-container w-full max-w-md ${status === 'failure' ? 'secret-code-failure' : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-center">
                    <SecretCodeIcon className="w-12 h-12 mx-auto text-purple-400 mb-4" />
                    <h3 className="font-cairo text-2xl font-bold mb-4">أدخل الكود السري</h3>
                </div>
                <form onSubmit={handleSubmit} className={status === 'success' ? 'secret-code-success' : ''}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                        placeholder="...الكود هنا"
                        className="secret-code-input w-full rounded-lg p-3 focus:outline-none transition-all duration-300"
                        disabled={status !== 'idle'}
                    />
                </form>
            </div>
        </div>
    );
};

const InfiniteTsukuyomiFailureScene: React.FC<{ onAnimationEnd: () => void }> = ({ onAnimationEnd }) => {
    useEffect(() => {
        const timer = setTimeout(onAnimationEnd, 6000);
        return () => clearTimeout(timer);
    }, [onAnimationEnd]);

    return (
        <div className="tsukuyomi-failure-scene">
            <div className="tsukuyomi-moon">
                <RinneSharinganIcon className="rinne-sharingan-overlay" />
            </div>
            <div className="tsukuyomi-text-container">
                <h2 className="tsukuyomi-text text-4xl sm:text-5xl font-black">
                    وقعت في الغينجتسو الأبدي...
                </h2>
                <p className="tsukuyomi-subtext font-tajawal text-lg mt-2">
                    استيقظ على الواقع وحاول مجدداً.
                </p>
            </div>
        </div>
    );
};


const QuizModal: React.FC<{ onComplete: () => void; }> = ({ onComplete }) => {
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('idle');
    const [revealedCorrectAnswer, setRevealedCorrectAnswer] = useState<string | null>(null);
    const [showFailure, setShowFailure] = useState(false);
    const [showHint, setShowHint] = useState(false);
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

    const handleAnswer = (option: string) => {
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
    
     const handleCodeSubmit = (code: string): 'success-hint' | 'success-solve' | 'success-skip' | 'failure' => {
        if (code === '112244') {
            setShowHint(true);
            return 'success-hint';
        }
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

    if (questions.length === 0) return null;

    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex) / questions.length) * 100;

    return (
        <div className={`quiz-modal-container fixed inset-0 z-[60] flex flex-col items-center justify-center p-4 sm:p-8 bg-black transition-all duration-500 ${showFailure ? 'is-failing' : ''}`}>
             
            <div className="absolute inset-0 z-[-1] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 via-black to-black opacity-70"></div>
                <RinneganIcon className="absolute -bottom-1/4 -left-1/4 w-3/4 h-3/4 text-red-900/40 animate-spin [animation-duration:80s]" />
                <MangekyoProIcon className="absolute -top-1/4 -right-1/4 w-3/4 h-3/4 text-red-900/40 animate-spin [animation-duration:120s] [animation-direction:reverse]" />
                <SharinganIcon className="quiz-bg-sharingan" />
            </div>

            {isCodeInputOpen && (
                <SecretCodeModal
                    onClose={() => setIsCodeInputOpen(false)}
                    onSubmit={handleCodeSubmit}
                />
            )}
            
            <div className="w-full max-w-4xl mx-auto flex flex-col flex-grow relative">
                 <div className="w-full max-w-lg mx-auto my-8">
                    <div className="flex justify-end text-sm font-bold text-gray-300 mb-1 px-2">
                        <span>السؤال {currentIndex + 1} / {questions.length}</span>
                    </div>
                    <div className="quiz-progress-bar h-4">
                        <div className="quiz-progress-bar-inner" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>


                <div className="flex-grow flex flex-col items-center justify-center text-center">
                    {showHint && (
                        <div className="hint-chakra-aura mb-6 max-w-2xl mx-auto">
                            <p className="text-lg text-amber-300 font-semibold">
                                <span className="font-bold">تلميح:</span> {currentQuestion.hint}
                            </p>
                        </div>
                    )}
                    
                    <h2 className="text-3xl md:text-5xl font-bold mb-10 font-cairo">{currentQuestion.question}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        {currentQuestion.options.map((option) => {
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
                           
                            return (
                                <button
                                    key={option}
                                    onClick={() => handleAnswer(option)}
                                    disabled={answerStatus !== 'idle'}
                                    className={`p-5 text-xl rounded-lg font-semibold transition-all duration-300 w-full text-right border-2 ${buttonClass}`}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                </div>
                
                 <div className="mt-auto pt-4 text-center">
                    <button
                        onClick={() => setIsCodeInputOpen(true)}
                        className="flex items-center gap-2 mx-auto px-4 py-2 rounded-lg bg-purple-900/40 border border-purple-700/50 text-purple-300 hover:bg-purple-900/80 hover:text-purple-200 transition-all shadow-lg"
                        title="إدخال الكود السري"
                    >
                        <SecretCodeIcon className="w-5 h-5" />
                        <span className="font-semibold">الكود السري</span>
                    </button>
                    <p className="text-sm text-gray-500 mt-4">أجب على {questions.length} أسئلة لتثبت جدارتك. ({currentIndex + 1}/{questions.length})</p>
                </div>
            </div>
            {showFailure && <InfiniteTsukuyomiFailureScene onAnimationEnd={resetQuiz} />}
        </div>
    );
};

type ActivationStage = 'void' | 'gathering' | 'unveiling' | 'ascension' | 'aftermath';
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

const SixPathsAwakeningScene: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const { setIsActivating } = useShinobiPro();
    const [stage, setStage] = useState<ActivationStage>('void');
    const [capturedWisps, setCapturedWisps] = useState<Set<number>>(new Set());
    // FIX: Replaced `NodeJS.Timeout` with `ReturnType<typeof setTimeout>` to resolve the `Cannot find namespace 'NodeJS'` error. This makes the type environment-agnostic (works in both Node.js and browser environments).
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        const speedBoost = capturedWisps.size * 400; // 400ms boost per wisp
        let nextStage: ActivationStage | 'complete' | null = null;
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
                    setStage(nextStage as ActivationStage);
                }
            }, Math.max(200, delay));
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [stage, onComplete, setIsActivating, capturedWisps.size]);

    const handleWispClick = (wispAngle: number) => {
        if (stage !== 'gathering' || capturedWisps.has(wispAngle)) return;
        setCapturedWisps(prev => new Set(prev).add(wispAngle));
    };
  
    return (
        <div className="awakening-scene-bg">
            <div className={`awakening-container`}>
                {stage === 'void' && <div className="truth-seeking-orb" />}
                
                {stage === 'gathering' && (
                    <>
                        <div className="truth-seeking-orb" />
                        {chakraWisps.map(wisp => (
                            <div 
                                key={wisp.angle} 
                                className={`chakra-wisp interactive ${capturedWisps.has(wisp.angle) ? 'captured' : ''}`}
                                onClick={() => handleWispClick(wisp.angle)}
                                style={{ '--wisp-color': wisp.color, '--angle': `${wisp.angle}deg`, animationDelay: `${wisp.delay}s` } as React.CSSProperties} 
                            />
                        ))}
                    </>
                )}
                
                {stage === 'unveiling' && (
                    <div className="awakening-rinnegan-container" style={{ animationDelay: '0s' }}>
                        <RinneganIcon className="awakening-rinnegan" />
                    </div>
                )}
                
                {stage === 'ascension' && (
                     <>
                        <div className="awakening-rinnegan-container">
                            <RinneganIcon className="awakening-rinnegan" />
                        </div>
                        <div className="shakujo-staff" />
                        <div className="truth-seeking-orbs-container">
                            {[...Array(6)].map((_, i) => {
                                const angle = i * 60;
                                const radius = 40; // Percentage
                                const x = radius * Math.cos(angle * Math.PI / 180);
                                const y = radius * Math.sin(angle * Math.PI / 180);
                                return (
                                    <div 
                                        key={i} 
                                        className="awakening-orb"
                                        style={{'--transform-end': `translate(${x}%, ${y}%)`, animationDelay: `${6 + i*0.1}s`} as React.CSSProperties}
                                    />
                                );
                            })}
                        </div>
                     </>
                )}
            </div>

             {stage === 'ascension' && <div className="ascension-flash" style={{animationDelay: '1.5s'}}/>}

            {stage === 'aftermath' && (
                <div className="awakening-aftermath">
                    <div className="awakening-text">
                         <h2 className="font-cairo text-4xl sm:text-5xl font-black">
                           لقد بلغت حكمة المسارات الستة
                        </h2>
                        <p className="font-tajawal text-lg text-amber-600 mt-2">
                            عالم الشينوبي الحقيقي ينكشف أمامك.
                        </p>
                    </div>
                </div>
            )}

            {stage === 'gathering' && (
                 <div className="awakening-prompt">انقر على خيوط التشاكرا لجمعها!</div>
            )}
        </div>
    );
};

const ShinobiPro: React.FC = () => {
    const { isPro, activatePro, isActivating, setIsActivating, isAkatsukiTheme, toggleAkatsukiTheme } = useShinobiPro();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = ReactRouterDOM.useNavigate();
    const location = ReactRouterDOM.useLocation();
    const [buttonsVisible, setButtonsVisible] = useState(true);
    const lastScrollY = useRef(0);

    const showButtons = location.pathname !== '/timeline';

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        if (lastScrollY.current < currentScrollY && currentScrollY > 100) {
          setButtonsVisible(false); // Scrolling down
        } else {
          setButtonsVisible(true); // Scrolling up
        }
        lastScrollY.current = currentScrollY;
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

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
            return (
                <>
                    <MangekyoProIcon className="w-12 h-12 text-yellow-400 pro-icon-active" />
                    <span className="font-cairo font-black text-white">شينوبي برو مفعل</span>
                </>
            );
        }
        return (
            <>
                <MangekyoProIcon className="w-12 h-12 group-hover:rotate-90 transition-transform duration-500" />
                <span className="font-cairo font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-300 to-red-400 group-hover:from-purple-200 group-hover:to-red-300">شينوبي برو</span>
            </>
        );
    }, [isPro]);

    return (
        <>
            {showButtons && (
                <>
                    <div className={`pro-buttons-wrapper fixed top-4 left-4 z-50 ${!buttonsVisible ? 'hidden' : ''}`}>
                      <button
                          onClick={() => (isPro ? navigate('/pro') : setIsModalOpen(true))}
                          className={`group flex items-center gap-4 p-2 pr-5 rounded-full border-2 backdrop-blur-sm transition-all duration-300 min-w-[280px] justify-start ${isPro ? 'pro-button-unreal shadow-[0_0_15px_#a855f7]' : 'pro-button-dormant'}`}
                          title={isPro ? "عرض مزايا برو" : "فعّل شينوبي برو"}
                      >
                          <div className="pro-button-content flex items-center gap-3">
                            {ProButtonContent}
                          </div>
                      </button>
                    </div>
                    
                    {isPro && (
                         <div className={`pro-buttons-wrapper-bottom fixed bottom-4 left-4 z-50 ${!buttonsVisible ? 'hidden' : ''}`}>
                            <button 
                                onClick={toggleAkatsukiTheme} 
                                title="تفعيل مظهر الأكاتسوكي" 
                                className={`group w-16 h-16 flex items-center justify-center rounded-full border-2 backdrop-blur-sm transition-all duration-300 pro-button-akatsuki shadow-[0_0_15px_#ef4444]`}
                                aria-pressed={isAkatsukiTheme}
                            >
                                <AkatsukiThemeIcon className={`w-10 h-10 transition-transform duration-1000 ${isAkatsukiTheme ? 'animate-continuous-rotate' : ''}`} style={{animationDuration: '3s'}} />
                            </button>
                         </div>
                      )}
                </>
            )}
            
            {isModalOpen && <QuizModal onComplete={handleCompleteQuiz} />}
            {isActivating && <SixPathsAwakeningScene onComplete={handleActivationComplete} />}
        </>
    );
};

export default ShinobiPro;
