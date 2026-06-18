import { useRef } from 'react';
import PageTransition from '../components/UI/PageTransition';
import ScrollReveal from '../components/UI/ScrollReveal';
import SectionTitle from '../components/UI/SectionTitle';
import Hero from '../components/Hero/Hero';
import SkillBar from '../components/UI/SkillBar';
import StatCard from '../components/UI/StatCard';
import profile from '../data/profile';
import './Profile.css';

const LUA_CODE_SNIPPET = `-- 🎮 Game Server Script
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local function onPlayerAdded(player)
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    local coins = Instance.new("IntValue")
    coins.Name = "Coins"
    coins.Value = 0
    coins.Parent = leaderstats

    print("⚡ " .. player.Name .. " joined!")
end

Players.PlayerAdded:Connect(onPlayerAdded)`;

function Profile() {
  const aboutRef = useRef(null);

  return (
    <PageTransition>
      <div className="profile-page">
        {/* Hero Section */}
        <Hero 
          name={profile.name} 
          title={profile.title} 
          tagline={profile.tagline} 
          avatarSrc={profile.avatar} 
        />

        {/* About Me Section */}
        <section className="about-section" ref={aboutRef}>
          <div className="container">
            <ScrollReveal>
              <SectionTitle
                title="About Me"
                subtitle="Get to know the developer behind the games"
              />
            </ScrollReveal>

            <div className="about-grid">
              <ScrollReveal direction="left">
                <div className="about-text">
                  <p>
                    {profile.bio || 
                      `I'm a passionate game developer specializing in creating immersive 
                      Roblox experiences that push the boundaries of what's possible on 
                      the platform. With years of experience in Lua scripting, 3D modeling, 
                      and game design, I bring ideas to life.`}
                  </p>
                  <p>
                    {profile.bioExtended || 
                      `From complex combat systems to sprawling open worlds, I focus on 
                      delivering polished, high-performance games that players love. Every 
                      project is crafted with attention to detail, clean architecture, and 
                      scalable code.`}
                  </p>
                  <p>
                    {profile.bioClosing || 
                      `When I'm not coding, you'll find me exploring new game mechanics, 
                      studying industry trends, or collaborating with talented creators 
                      from around the world.`}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <div className="about-visual">
                  <div className="code-window">
                    <div className="code-window__header">
                      <div className="code-window__dots">
                        <span className="code-window__dot code-window__dot--red"></span>
                        <span className="code-window__dot code-window__dot--yellow"></span>
                        <span className="code-window__dot code-window__dot--green"></span>
                      </div>
                      <span className="code-window__title">server.lua</span>
                    </div>
                    <pre className="code-window__body">
                      <code>{LUA_CODE_SNIPPET}</code>
                    </pre>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills-section">
          <div className="container">
            <ScrollReveal>
              <SectionTitle
                title="Skills & Expertise"
                subtitle="Technologies and tools I master"
              />
            </ScrollReveal>

            <div className="skills-grid">
              {(profile.skills || []).map((skill, index) => (
                <ScrollReveal key={skill.name || index} delay={index * 0.1}>
                  <SkillBar
                    name={skill.name}
                    level={skill.level}
                    icon={skill.icon}
                    color={skill.color}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="container">
            <ScrollReveal>
              <SectionTitle
                title="By The Numbers"
                subtitle="Achievements and milestones"
              />
            </ScrollReveal>

            <div className="stats-grid">
              {(profile.stats || []).map((stat, index) => (
                <ScrollReveal key={stat.label || index} delay={index * 0.15}>
                  <StatCard
                    icon={stat.icon}
                    value={stat.value}
                    label={stat.label}
                    suffix={stat.suffix}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

export default Profile;
