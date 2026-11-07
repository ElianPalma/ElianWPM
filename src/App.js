import React from 'react';
import DynamicCursor from './components/DynamicCursor';
import PortfolioHeader from './components/PortfolioHeader';
import HeroSlider from './components/HeroSlider';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import useSpotlight from './hooks/useSpotlight';

const App = () => {
  useSpotlight();

  return (
    <div className="min-h-screen bg-ink-950 font-sans antialiased">
      <DynamicCursor />
      <PortfolioHeader />
      <main>
        <HeroSlider />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;

// DONE

const handleProjectClick = (projectName) => {
  // Esta es la forma técnica de enviar datos a GTM desde React
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'project_view', // Nombre del evento
    project_name: projectName,
    category: 'portfolio_interaction'
  });
  console.log(`Evento de ${projectName} enviado al DataLayer`);
};

// En tu JSX del botón o enlace:
// <button onClick={() => handleProjectClick('Mi Proyecto React')}>Ver Proyecto</button>
