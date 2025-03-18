import { StudentProfile } from "./StudentProfile";

export function FeaturedCampaigns() {
    return (
      <div className="bg-white px-16 py-24">
        <h2 className="text-[48px] font-bold">Featured Campaigns</h2>
        <p className="mt-4 text-lg">
          Every student has a story. Every donor has the power to rewrite it.
          Browse profiles and support bright minds.
        </p>
        <StudentProfile/>
      </div>
    );
  }