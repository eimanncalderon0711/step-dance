import aboutDance from "@/assets/about-dance.jpg";
import { Heart, Users, Zap, Dumbbell, StretchHorizontal, Target, Brain, Scale } from "lucide-react";
import Image from "next/image";

const features = [
  { icon: Heart, title: "Cardiovascular Health", desc: "Improve heart and lung function through energizing aerobic step routines." },
  { icon: Scale, title: "Weight Management", desc: "Burn calories effectively to support weight loss or healthy maintenance." },
  { icon: Dumbbell, title: "Muscle Toning", desc: "Strengthen and tone your legs, glutes, and core with every session." },
  { icon: StretchHorizontal, title: "Flexibility", desc: "Enhance your range of motion and reduce stiffness through dynamic movements." },
  { icon: Target, title: "Coordination & Balance", desc: "Sharpen body coordination and balance with rhythmic step patterns." },
  { icon: Zap, title: "Endurance", desc: "Build stamina and energy levels for prolonged physical activity." },
  { icon: Brain, title: "Mental Health", desc: "Reduce stress, boost your mood, and gain mental clarity through movement." },
  { icon: Users, title: "Social Interaction", desc: "Build community and lasting friendships through fun group exercise." },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        {/* Intro */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">About Us</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              More Than Just a Workout
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Step Dance Studio was founded with one mission: to make fitness fun and accessible through the power of step dancing. We believe that staying healthy shouldn't feel like a chore — it should feel like a celebration.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our certified instructors create an inclusive, supportive environment where everyone can move at their own pace. Every class is a chance to connect with your body, meet new people, and leave feeling amazing.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <Image src={'/images/about-dance.jpg'} alt="Step dance in studio" loading="lazy" width={800} height={800} className="w-full h-80 md:h-96 object-cover" />
          </div>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:shadow-lg hover:border-primary transition-all duration-300">
              <div className="w-11 h-11 rounded-lg bg-orange-600/10 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-bold text-white mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
};

export default AboutSection;