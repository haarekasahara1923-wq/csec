export default function PrivacyPolicyPage() {
    return (
        <div className="pt-24 min-h-screen bg-white">
            <div className="container mx-auto px-4 py-20 max-w-4xl">
                <h1 className="text-4xl font-bold text-primary mb-12 text-center">Privacy Policy</h1>

                <div className="prose prose-slate max-w-none space-y-8 text-gray-600">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-primary">1. Information We Collect</h2>
                        <p>At CSEC Gwalior, we collect personal information such as your name, email address, phone number, and academic details when you fill out our application or contact forms. This information is used to provide you with the best possible educational guidance.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-primary">2. How We Use Your Information</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>To provide personalized career counseling and admission services.</li>
                            <li>To communicate with you regarding your application status.</li>
                            <li>To send you updates about new courses and university opportunities.</li>
                            <li>To improve our website and services based on user feedback.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-primary">3. Data Security</h2>
                        <p>We implement a variety of security measures to maintain the safety of your personal information. Your data is stored in secure databases and is only accessible by authorized personnel.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-primary">4. Disclosure to Third Parties</h2>
                        <p>We do not sell, trade, or otherwise transfer your personal information to outside parties except for trust partners (universities/colleges) to facilitate your admission process.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-primary">5. Cookies</h2>
                        <p>Our website uses cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, but this may affect some functionality of the site.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-primary">6. Contact Us</h2>
                        <p>If you have any questions regarding this privacy policy, you may contact us using the information on our Contact Us page.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
