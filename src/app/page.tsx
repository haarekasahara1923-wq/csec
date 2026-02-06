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
              <h1 className="text-5xl md:text-7xl font-bold text-primary leading-[1.1]">
                Your Gateway to <br />
                <span className="text-secondary">Premier Education</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
                Expert guidance for university admissions, career counseling, and study abroad programs.
                We turn your academic aspirations into reality.
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

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-primary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-2xl">
                <h3 className="text-2xl font-bold text-primary mb-6 text-center">Fast-Track Your Admission</h3>
                <LeadForm sourcePage="Home Hero" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-sm font-bold tracking-widest text-secondary uppercase">Our Services</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-primary">Comprehensive Guidance</h3>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We provide end-to-end support for your educational journey, from selecting the right course to securing your admission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Career Counseling", desc: "Personalized advice to help you choose the career path that matches your passion and potential." },
              { icon: School, title: "University Selection", desc: "Expert help in choosing the best colleges and universities based on your profile and goals." },
              { icon: BookOpen, title: "Admission Assistance", desc: "Step-by-step guidance through the complex admission process and documentation." },
              { icon: Globe, title: "Study Abroad", desc: "Complete support for international admissions, including visas and pre-departure briefings." },
              { icon: Briefcase, title: "Job Placement", desc: "Connecting graduates with top employers and career opportunities in their field." },
              { icon: GraduationCap, title: "Scholarship Guidance", desc: "Informing and helping students apply for various financial aids and merit-based scholarships." },
            ].map((service, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-shadow border-none bg-slate-50 p-8">
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-secondary" />
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">{service.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / CTA */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center text-white space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold max-w-4xl mx-auto leading-tight">
            Ready to Start Your <span className="text-secondary">Success Story?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of successful students who achieved their dreams with CSEC.
          </p>
          <div className="flex justify-center pt-8">
            <Link href="/contact">
              <Button size="lg" className="bg-secondary hover:bg-white hover:text-primary text-primary font-bold px-12 h-16 rounded-full transition-all duration-300">
                Talk to an Expert Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-2">Popular</h2>
              <h3 className="text-4xl font-bold text-primary">Featured Courses</h3>
            </div>
            <Link href="/courses" className="text-primary font-bold flex items-center hover:text-secondary">
              View All <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.length > 0 ? courses.map((course) => (
              <Card key={course.id} className="group hover:-translate-y-2 transition-transform duration-300">
                <div className="h-48 bg-gray-100 flex items-center justify-center p-8 group-hover:bg-primary/5 transition-colors">
                  <GraduationCap className="w-16 h-16 text-primary/20 group-hover:text-primary transition-colors" />
                </div>
                <CardContent className="space-y-2">
                  <h4 className="text-xl font-bold text-primary">{course.title}</h4>
                  <p className="text-gray-500 text-sm line-clamp-2">{course.description}</p>
                </CardContent>
              </Card>
            )) : (
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
                  src="https://images.unsplash.com/photo-1523050335392-9ae86eb197ee?q=80&w=1000&auto=format&fit=crop"
                  alt="Students"
                  className="w-full h-full object-cover"
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
