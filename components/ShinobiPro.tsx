





import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
// FIX: Replaced named imports with a namespace import for 'react-router-dom' to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { useShinobiPro } from '../hooks/useShinobiPro';
import MangekyoProIcon from './icons/MangekyoProIcon';
import SharinganIcon from './icons/SharinganIcon';
import MangekyoIcon from './icons/MangekyoIcon';
import { quizQuestions } from '../data/quiz';
import { QuizQuestion } from '../types';
import AkatsukiSymbol from './icons/AkatsukiSymbol';
import AkatsukiThemeIcon from './icons/AkatsukiThemeIcon';
import UchihaSymbol from './icons/UchihaSymbol';
import SenjuSymbol from './icons/SenjuSymbol';
import HyugaSymbol from './icons/HyugaSymbol';
import RinneganIcon from './icons/RinneganIcon';
import ByakuganIcon from './icons/ByakuganIcon';
import SecretCodeIcon from './icons/SecretCodeIcon';


type AnswerStatus = 'idle' | 'correct' | 'incorrect';

const SecretCodeModal: React.FC<{
    onClose: () => void;
    onSubmit: (code: string) => 'success-hint' | 'success-solve' | 'failure';
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

        if (code === '112244' || code === '13579001') {
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

        // Only handles incorrect codes on enter, as correct ones are auto-submitted
        if (code !== '112244' && code !== '13579001') {
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
            setTimeout(() => setShowFailure(true), 2000);
            setTimeout(resetQuiz, 4000);
        }
    };
    
     const handleCodeSubmit = (code: string): 'success-hint' | 'success-solve' | 'failure' => {
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
        return 'failure';
    };

    if (questions.length === 0) return null;

    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex) / questions.length) * 100;

    return (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center p-4 sm:p-8 bg-black">
             <div className="absolute inset-0 z-[-1] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 via-black to-black opacity-70"></div>
                <SharinganIcon className="absolute -bottom-1/4 -left-1/4 w-3/4 h-3/4 text-red-900/40 animate-spin [animation-duration:80s]" />
                <SharinganIcon className="absolute -top-1/4 -right-1/4 w-3/4 h-3/4 text-red-900/40 animate-spin [animation-duration:120s] [animation-direction:reverse]" />
                <MangekyoProIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 text-white/5 animate-[pulse_10s_ease-in-out_infinite]" />
            </div>

            {isCodeInputOpen && (
                <SecretCodeModal
                    onClose={() => setIsCodeInputOpen(false)}
                    onSubmit={handleCodeSubmit}
                />
            )}

            {showFailure && (
                <div className="absolute inset-0 bg-red-900/90 flex flex-col items-center justify-center z-20 transition-opacity duration-300">
                    <h2 className="text-5xl font-black font-cairo text-white">فشلت!</h2>
                    <p className="text-xl text-red-200 mt-2">المعرفة تتطلب المزيد من التدريب. المحاولة مرة أخرى...</p>
                </div>
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
        </div>
    );
};

type ActivationStage = 'charging' | 'exploding' | 'revealing';

const CinematicActivationScene: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { setIsActivating } = useShinobiPro();
  const [stage, setStage] = useState<ActivationStage>('charging');
  const [clickCount, setClickCount] = useState(0);
  
  const powerSymbols = useMemo(() => [
    { Icon: UchihaSymbol, color: 'text-red-500' },
    { Icon: SenjuSymbol, color: 'text-green-500' },
    { Icon: HyugaSymbol, color: 'text-purple-400' },
    { Icon: RinneganIcon, color: 'text-indigo-400' },
    { Icon: ByakuganIcon, color: 'text-blue-300' },
    { Icon: SharinganIcon, color: 'text-red-600' },
    { Icon: MangekyoIcon, color: 'text-red-700' },
  ], []);


  const handleClick = () => {
    if (stage !== 'charging') return;
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    if (newClickCount >= 7) {
      setTimeout(() => setStage('exploding'), 300);
    }
  };

  useEffect(() => {
    if (stage === 'exploding') {
      setTimeout(() => setStage('revealing'), 2500); // Explosion duration
    } else if (stage === 'revealing') {
      const timer = setTimeout(() => {
        setIsActivating(false);
        onComplete();
      }, 7000); // Time to read the message
      return () => clearTimeout(timer);
    }
  }, [stage, onComplete, setIsActivating]);

  const rotationSpeed = Math.max(0.1, 1.5 - clickCount * 0.2);
  const sharinganStyle = {
    animationDuration: `${rotationSpeed}s`,
  };

  return (
    <div className={`fixed inset-0 z-[70] flex items-center justify-center p-4 akatsuki-cinematic-bg transition-opacity duration-500`}>
      <AkatsukiSymbol className="absolute w-96 h-96 text-red-900/50 -top-20 -left-20 transform-gpu animate-[slow-float_10s_ease-in-out_infinite]" />
      <AkatsukiSymbol className="absolute w-80 h-80 text-red-900/50 -bottom-24 -right-20 transform-gpu animate-[slow-float_12s_ease-in-out_infinite_reverse]" />
      
      {stage === 'charging' && (
        <div className="text-center animate-[cinematic-fade-in_1s_ease-out]">
          <div
            className="w-48 h-48 md:w-64 md:h-64 cursor-pointer relative group"
            onClick={handleClick}
            aria-label="انقر لزيادة السرعة"
          >
            <SharinganIcon
              className="w-full h-full animate-spin"
              style={sharinganStyle}
            />
            <div className="absolute inset-0 rounded-full group-hover:bg-white/10 transition-colors"></div>
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-full rounded-full border-4 border-red-500/50 animate-ping" style={{animationDuration: '1.5s', transform: `scale(${0.5 + clickCount * 0.1})`, opacity: `${1 - clickCount * 0.1}`}}></div>
            </div>
          </div>
          <p className="mt-8 font-cairo text-2xl font-bold text-white tracking-widest text-shadow shadow-black/50">
            {clickCount < 3 ? "ركّز التشاكرا" : clickCount < 6 ? "أطلق العنان للقوة!" : "على وشك الانفجار!"}
          </p>
          <p className="text-red-300">انقر على الشارينغان ({clickCount}/7)</p>
        </div>
      )}

      {stage === 'exploding' && (
        <div className="relative w-64 h-64 flex items-center justify-center">
            <div className="absolute inset-0 bg-white rounded-full animate-[explosion-flash_0.5s_cubic-bezier(0.68,-0.55,0.27,1.55)_forwards]"></div>
            <div className="absolute inset-0 rounded-full border-red-500 animate-[explosion-shockwave_1s_ease-out_forwards]"></div>
            <div className="absolute inset-0 rounded-full border-purple-500 animate-[explosion-shockwave_1s_ease-out_0.2s_forwards]"></div>
            
            {powerSymbols.map(({ Icon, color }, i) => {
                 const angle = (i / powerSymbols.length) * 360;
                 const radians = angle * (Math.PI / 180);
                 const distance = 100 + Math.random() * 50;
                 const tx = Math.cos(radians) * distance;
                 const ty = Math.sin(radians) * distance;

                return (
                    <div key={i}
                         className="absolute w-12 h-12 opacity-0"
                         // FIX: Cast the style object to React.CSSProperties to allow for custom CSS properties ('--tx', '--ty').
                         style={{
                             '--tx': `${tx}px`,
                             '--ty': `${ty}px`,
                             animation: `symbol-burst 2s ${i * 0.05}s ease-out forwards`,
                         } as React.CSSProperties}
                    >
                      <Icon className={`w-full h-full ${color}`} style={{filter: 'drop-shadow(0 0 8px currentColor)'}} />
                    </div>
                )
            })}
        </div>
      )}

      {stage === 'revealing' && (
          <div className="flex flex-col items-center justify-center text-center p-8 max-w-4xl mx-auto border-2 border-transparent bg-black/30 backdrop-blur-md rounded-2xl shadow-2xl shadow-red-500/30 animate-[frame-fade-in_1.5s_ease-out_forwards]">
            <h2 className="font-cairo text-4xl sm:text-5xl md:text-6xl font-black tracking-wider bg-gradient-to-r from-yellow-300 via-red-400 to-yellow-300 bg-clip-text text-transparent animate-[text-glow-animation_5s_ease_infinite,text-fade-in_2s_0.5s_ease-out_backwards]" style={{backgroundSize: '200% 200%'}}>
              أصبحت الآن شينوبي حقيقي
            </h2>
            <blockquote className="mt-6 relative">
              <p className="font-tajawal text-lg md:text-xl text-gray-300 animate-[quote-fade-in_2s_1.5s_ease-out_backwards]">
                "أولئك الذين لا يفهمون الألم الحقيقي لا يمكنهم فهم السلام الحقيقي."
              </p>
              <cite className="block text-right mt-2 text-red-400 not-italic animate-[quote-fade-in_2s_1.8s_ease-out_backwards]">- باين</cite>
            </blockquote>
        </div>
      )}
    </div>
  );
};


const ShinobiPro: React.FC = () => {
    const { isPro, activatePro, isActivating, setIsActivating, isAkatsukiTheme, toggleAkatsukiTheme } = useShinobiPro();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = ReactRouterDOM.useNavigate();
    const location = ReactRouterDOM.useLocation();

    const showButtons = location.pathname !== '/timeline';

    const handleCompleteQuiz = () => {
        setIsModalOpen(false);
        activatePro();
        setIsActivating(true);
    };

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
                    <div className="fixed top-4 left-4 z-50">
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
                         <div className="fixed bottom-4 left-4 z-50">
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
            {isActivating && <CinematicActivationScene onComplete={handleActivationComplete} />}
        </>
    );
};

export default ShinobiPro;