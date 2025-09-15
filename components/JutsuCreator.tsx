import React, { useState, useCallback } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

const JutsuCreator = () => {
    const [inputs, setInputs] = useState({ name: '', nature: '', description: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<any | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleGenerate = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputs.description) {
            setError("يرجى تقديم وصف لفكرة الجتسو.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

            const responseSchema = {
                type: Type.OBJECT,
                properties: {
                    jutsuName: { type: Type.STRING, description: "اسم مبتكر ومناسب للجتسو." },
                    rank: { type: Type.STRING, description: "رتبة الجتسو (S, A, B, C, D)." },
                    classification: { type: Type.STRING, description: "تصنيف الجتسو (Ninjutsu, Genjutsu, Taijutsu)." },
                    natureType: { type: Type.STRING, description: "طبيعة التشاكرا الأساسية (نار، ماء، إلخ) أو 'خاص'." },
                    description: { type: Type.STRING, description: "وصف تفصيلي لكيفية عمل الجتسو وما يفعله." },
                    handSeals: { type: Type.ARRAY, items: { type: Type.STRING }, description: "قائمة بأسماء أختام اليد اللازمة (مثل: نمر، ثعبان، تنين)." },
                    strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "قائمة بنقاط قوة الجتسو أو استخداماته الاستراتيجية." },
                    weaknesses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "قائمة بنقاط ضعف الجتسو أو حدوده." },
                },
                required: ["jutsuName", "rank", "classification", "description", "handSeals"]
            };

            const systemInstruction = "أنت خبير في عالم ناروتو ومبتكر تقنيات نينجا أسطوري. مهمتك هي تحويل أفكار المستخدمين إلى جتسو متكامل ومبتكر. قم بملء كل حقل في مخطط JSON المطلوب بتفاصيل إبداعية ومناسبة لعالم ناروتو.";
            const userPrompt = `ابتكر جتسو بناءً على هذه التفاصيل:\n- الاسم المقترح: ${inputs.name || 'غير محدد'}\n- طبيعة التشاكرا المقترحة: ${inputs.nature || 'غير محدد'}\n- الفكرة الأساسية: ${inputs.description}`;
            
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: userPrompt,
                config: {
                    systemInstruction,
                    responseMimeType: "application/json",
                    responseSchema,
                },
            });
            
            const resultText = response.text.trim();
            const resultJson = JSON.parse(resultText);
            setResult(resultJson);

        } catch (e) {
            console.error(e);
            setError("حدث خطأ أثناء ابتكار الجتسو. قد يكون الطلب معقدًا جدًا. حاول مرة أخرى بفكرة أبسط.");
        } finally {
            setIsLoading(false);
        }
    }, [inputs]);

    return (
        <div>
            <form onSubmit={handleGenerate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        value={inputs.name}
                        onChange={handleInputChange}
                        placeholder="الاسم المقترح للجتسو (اختياري)"
                        className="jutsu-form-input"
                    />
                    <input
                        type="text"
                        name="nature"
                        value={inputs.nature}
                        onChange={handleInputChange}
                        placeholder="طبيعة التشاكرا (اختياري)"
                        className="jutsu-form-input"
                    />
                </div>
                <textarea
                    name="description"
                    value={inputs.description}
                    onChange={handleInputChange}
                    placeholder="صف فكرتك هنا... على سبيل المثال: 'جتسو يخلق درعًا من الماء يدور بسرعة عالية'"
                    rows={3}
                    className="jutsu-form-input"
                    required
                />
                <div className="text-center">
                    <button type="submit" disabled={isLoading} className="jutsu-generate-button">
                        {isLoading ? 'جاري الابتكار...' : 'ابتكر الجتسو'}
                    </button>
                </div>
            </form>

            {isLoading && (
                <div className="flex justify-center items-center mt-8">
                     <svg className="w-12 h-12 jutsu-loader-spinner" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                     </svg>
                </div>
            )}
            
            {error && <p className="mt-4 text-center text-red-400 bg-red-900/30 p-3 rounded-lg">{error}</p>}
            
            {result && (
                <div className="jutsu-result-scroll">
                    <div className="text-center mb-4">
                        <h3 className="text-3xl font-cairo font-black">{result.jutsuName}</h3>
                        <div className="flex items-center justify-center gap-2 mt-2">
                            <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-900/20 text-blue-900">{result.classification}</span>
                            <span className="px-3 py-1 text-sm font-semibold rounded-full bg-purple-900/20 text-purple-900">{result.natureType}</span>
                             <span className="px-3 py-1 text-sm font-semibold rounded-full bg-yellow-900/20 text-yellow-900">الرتبة: {result.rank}</span>
                        </div>
                    </div>

                    <p className="text-lg leading-relaxed mb-4">{result.description}</p>
                    
                    {result.handSeals && result.handSeals.length > 0 && (
                       <div className="mb-4">
                           <h4>أختام اليد</h4>
                           <div className="flex flex-wrap gap-2">
                               {result.handSeals.map((seal: string) => <span key={seal} className="hand-seal">{seal}</span>)}
                           </div>
                       </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {result.strengths && result.strengths.length > 0 && (
                            <div>
                                <h4>نقاط القوة</h4>
                                <ul className="list-disc list-inside space-y-1">
                                    {result.strengths.map((s: string) => <li key={s}>{s}</li>)}
                                </ul>
                            </div>
                        )}
                        {result.weaknesses && result.weaknesses.length > 0 && (
                            <div>
                                <h4>نقاط الضعف</h4>
                                <ul className="list-disc list-inside space-y-1">
                                    {result.weaknesses.map((w: string) => <li key={w}>{w}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default JutsuCreator;
