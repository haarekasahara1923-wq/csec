import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { LeadForm } from "@/components/LeadForm";
import {
  CheckCircle2,
  GraduationCap,
  Globe,
  Users,
  Award,
  ArrowRight,
  School,
  BookOpen,
  Briefcase
} from "lucide-react";
import prisma from "@/lib/prisma";

export default async function Home() {
  const courses = await prisma.course.findMany({ where: { active: true }, take: 4 });
  const universities = await prisma.university.findMany({ where: { active: true }, take: 4 });

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-secondary/10 border border-secondary/20 px-4 py-2 rounded-full text-secondary font-bold text-sm">
                <Award className="w-4 h-4" />
                <span>Trusted by 5000+ Students</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-primary leading-[1.0] tracking-tighter">
                Your College <br />
                <span className="text-secondary italic">Seat Selection</span>
              </h1>
              <p className="text-xl text-slate-500 max-w-xl leading-relaxed font-medium">
                UG Admissions open for 2026. Get expert counseling for 
                <span className="text-primary font-bold"> Management, Engineering, and Design </span> 
                at top private universities.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/apply">
                  <Button size="lg" className="w-full sm:w-auto shadow-xl shadow-primary/20">
                    Apply Now <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Explore Courses
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                <div>
                  <p className="text-3xl font-bold text-primary">15+</p>
                  <p className="text-sm text-gray-500">Years Experience</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">200+</p>
                  <p className="text-sm text-gray-500">Universities</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">98%</p>
                  <p className="text-sm text-gray-500">Success Rate</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src="/hero-offer.jpg" 
                alt="College Admissions 2026 Offer" 
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-2xl font-black mb-2 leading-none uppercase tracking-tighter italic">Admissions Open 2026</h3>
                  <p className="text-sm font-bold text-gray-200">Management | Engineering | Design | Law</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-[10px] font-black tracking-[0.3em] text-secondary uppercase bg-secondary/5 inline-block px-4 py-2 rounded-full border border-secondary/10">Expert Guidance</h2>
            <h3 className="text-5xl md:text-7xl font-black text-primary tracking-tighter">Your Future, <span className="text-secondary italic">Our Commitment</span></h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { img: "/service_career.png", title: "Career Counseling", desc: "Expert assessment of your skills and passions to find your perfect professional path." },
              { img: "/service_uni.png", title: "University Selection", desc: "Identifying top institutions that match your academic profile and long-term goals." },
              { img: "/service_admission.png", title: "Admission Assistance", desc: "Complete support for applications, from SOP editing to secure enrollment documentation." },
              { img: "/service_abroad.png", title: "Study Abroad", desc: "Global exposure through our partnerships with leading international universities." },
              { img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop", title: "Job Placement", desc: "End-to-end career support including internship placement and final job offers." },
              { img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop", title: "Scholarship Guidance", desc: "Maximizing your financial aid opportunities with merit and need-based scholarships." },
            ].map((service, idx) => (
              <Card key={idx} className="group overflow-hidden border-none bg-slate-50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 rounded-[40px]">
                <div className="h-64 overflow-hidden relative">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="p-8 space-y-3">
                  <h4 className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-secondary transition-colors">{service.title}</h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">{service.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / CTA */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center text-white space-y-8">
          <h2 className="text-4xl md:text-7xl font-black max-w-4xl mx-auto leading-[1.1] tracking-tighter">
            Build Your <span className="text-secondary italic">Global Career</span> Starting Today
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-medium">
            Join 10,000+ graduates already shining in top global organizations.
          </p>
          <div className="flex justify-center pt-8">
            <Link href="/contact">
              <Button size="lg" className="bg-secondary hover:bg-white hover:text-primary text-primary font-black px-12 h-20 rounded-2xl text-xl transition-all duration-500 shadow-3xl shadow-secondary/20">
                Talk to an Expert Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div className="space-y-2">
              <h2 className="text-[10px] font-black tracking-[0.3em] text-secondary uppercase bg-white inline-block px-4 py-2 rounded-full border border-slate-100">Top Programs</h2>
              <h3 className="text-5xl font-black text-primary tracking-tighter">Premier <span className="text-secondary italic">Courses</span></h3>
            </div>
            <Link href="/courses" className="bg-white px-8 py-4 rounded-2xl text-primary font-black flex items-center hover:bg-primary hover:text-white transition-all duration-300 shadow-sm">
              View All Courses <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.length > 0 ? courses.map((course) => {
              // Specific images for popular courses
              let courseImage = course.image;
              if (!courseImage) {
                const title = course.title.toLowerCase();
                if (title.includes('mbbs') || title.includes('medicine')) courseImage = "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop";
                else if (title.includes('b.tech') || title.includes('engineering') || title.includes('btech')) courseImage = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop";
                else if (title.includes('mba')) courseImage = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop";
                else if (title.includes('bba')) courseImage = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop";
                else courseImage = "https://images.unsplash.com/photo-1523050335392-9ae86eb197ee?q=80&w=800&auto=format&fit=crop";
              }

              return (
                <Card key={course.id} className="group overflow-hidden border-none bg-white transition-all duration-500 hover:shadow-2xl rounded-[40px]">
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src={courseImage || "https://images.unsplash.com/photo-1523050335392-9ae86eb197ee?q=80&w=800&auto=format&fit=crop"} 
                      alt={course.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <CardContent className="p-8 space-y-2">
                    <h4 className="text-2xl font-black text-slate-800 tracking-tight leading-none mb-4">{course.title}</h4>
                    <p className="text-slate-400 text-sm font-medium line-clamp-2 leading-relaxed">{course.description}</p>
                  </CardContent>
                </Card>
              );
            }) : (
              <p className="text-gray-500 col-span-full text-center">No courses found. Add them in admin panel.</p>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000&auto=format&fit=crop"
                  alt="Students Studying"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-2xl shadow-xl hidden md:block">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">100%</p>
                    <p className="text-sm text-gray-500">Placement Support</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-sm font-bold tracking-widest text-secondary uppercase">Why Choose CSEC?</h2>
              <h3 className="text-4xl font-bold text-primary">Your Success is Our Priority</h3>
              <div className="space-y-6">
                {[
                  { title: "Expert Faculty & Advisors", desc: "Our team consists of industry experts and experienced counselors." },
                  { title: "Personalized Career Path", desc: "We don't believe in one-size-fits-all. Every student gets a custom roadmap." },
                  { title: "Hassle-free Admission", desc: "We handle the paperwork while you focus on your studies." },
                  { title: "Global Network", desc: "Direct tie-ups with 200+ universities worldwide." },
                ].map((item, idx) => (
                  <div key={idx} className="flex space-x-4">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-primary">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/about">
                <Button size="lg" className="px-10">Read Our Story</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
