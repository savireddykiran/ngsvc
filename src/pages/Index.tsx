import Navbar from "@/components/hackathon/Navbar";
import HeroSection from "@/components/hackathon/HeroSection";
import ObjectiveSection from "@/components/hackathon/ObjectiveSection";
import ChallengeSection from "@/components/hackathon/ChallengeSection";
import UserStoriesSection from "@/components/hackathon/UserStoriesSection";
import RankingSection from "@/components/hackathon/RankingSection";
import TimelineSection from "@/components/hackathon/TimelineSection";
import TechStackSection from "@/components/hackathon/TechStackSection";
import SubmissionSection from "@/components/hackathon/SubmissionSection";
import JudgingSection from "@/components/hackathon/JudgingSection";
import ImportantNotesSection from "@/components/hackathon/ImportantNotesSection";
import FAQSection from "@/components/hackathon/FAQSection";
import RegisterSection from "@/components/hackathon/RegisterSection";
import Footer from "@/components/hackathon/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ObjectiveSection />
      <ChallengeSection />
      <UserStoriesSection />
      <RankingSection />
      <TimelineSection />
      <TechStackSection />
      <SubmissionSection />
      <JudgingSection />
      <ImportantNotesSection />
      <FAQSection />
      <RegisterSection />
      <Footer />
    </div>
  );
};

export default Index;
