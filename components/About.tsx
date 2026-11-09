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
    <section id="about" className="home-about home-section">
      <div className="home-container">
        <div className="home-about-intro">
          <div className="home-about-copy">

            <span className="home-eyebrow">About Us</span>
            <h2 className="home-section-title">
              More Than Just a Workout
            </h2>
            <p className="home-body-copy">
              StepDance PH was founded with one mission: to make fitness fun and accessible through the power of step dancing. We believe that staying healthy shouldn't feel like a chore — it should feel like a celebration.
            </p>
            <p className="home-body-copy">
              Our certified instructors create an inclusive, supportive environment where everyone can move at their own pace. Every class is a chance to connect with your body, meet new people, and leave feeling amazing.
            </p>
          </div>
          <div className="home-about-visual">
            <Image src={'/images/about-dance.jpg'} alt="Step dance in studio" loading="lazy" width={800} height={800} sizes="(max-width: 800px) 100vw, 45vw" className="home-about-photo" />
          </div>
        </div>

        <div className="home-benefits-heading">
          <div><p className="home-eyebrow">The feel-good benefits</p><h2 className="home-section-title">Every step does more.</h2></div>
          <p className="home-body-copy">For your body. For your mind.<br />For the joy of moving together.</p>
        </div>
        <div className="home-benefits-grid">
          {features.map((f, index) => (
            <div key={f.title} className="home-benefit-card">
              <div className="home-benefit-top">
                <f.icon className="home-benefit-icon" /><span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="home-benefit-title">{f.title}</h3>
              <p className="text-sm home-body-copy">{f.desc}</p>
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
};

export default AboutSection;