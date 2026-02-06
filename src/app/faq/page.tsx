import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/Accordion";

export const metadata = {
    title: "Frequently Asked Questions (FAQ)",
};

export default function FAQPage() {
    const faqs = [
        {
            q: "What services does CSEC provide?",
            a: "CSEC provides comprehensive education consultancy including career counseling, university selection, admission assistance for UG/PG courses (MBBS, B.Tech, MBA, etc.), documentation support, and study abroad consultancy."
        },
        {
            q: "Is CSEC an authorized consultancy?",
            a: "Yes, CSEC is a registered education consultancy with 15+ years of experience and partnerships with numerous reputed government and private universities across India and abroad."
        },
        {
            q: "Do you charge any fees for counseling?",
            a: "Initial counseling sessions are often free for students to understand their options. Specific service fees depend on the complexity of the admission process and the course/university chosen."
        },
        {
            q: "Does CSEC help with study abroad visas?",
            a: "Yes, we provide full support for study abroad programs, including university selection, application submission, SOP guidance, and visa interview preparation."
        },
        {
            q: "Can you help me get into government colleges?",
            a: "We provide guidance on entrance exams (NEET, JEE, CAT, etc.) and the counseling process for government colleges. We also assist with direct admissions in various UGC-approved private universities."
        },
        {
            q: "Where is CSEC located?",
            a: "We are located in Gwalior, Madhya Pradesh, near the Trade Fair Ground. You can find our exact address on the Contact Us page."
        }
    ];

    return (
        <div className="pt-24 min-h-screen bg-slate-50">
            <section className="py-20 text-center">
                <h1 className="text-4xl font-bold text-primary mb-4">Frequently Asked Questions</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">Everything you need to know about our services and process.</p>
            </section>

            <section className="pb-24">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
                        <div className="space-y-6">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                    <h3 className="text-xl font-bold text-primary mb-3">Q: {faq.q}</h3>
                                    <p className="text-gray-600 leading-relaxed">A: {faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
