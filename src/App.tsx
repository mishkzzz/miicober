import { useState } from 'react';
import Navbar from './components/Navbar';
import MenuDrawer from './components/MenuDrawer';
import IntakeModal from './components/IntakeModal';
import Hero from './sections/Hero';
import Systems from './sections/Systems';
import { type Service } from './lib/services';
import Pipeline from './sections/Pipeline';
import Payment from './sections/Payment';
import Trust from './sections/Trust';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [activeService, setActiveService] = useState<Service | null>(null);

  const openIntake = (service: Service | null) => {
    setActiveService(service);
    setIntakeOpen(true);
  };

  return (
    <>
      <Navbar
        onOpenMenu={() => setMenuOpen(true)}
        onOpenIntake={() => openIntake(null)}
      />

      <MenuDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenIntake={() => openIntake(null)}
      />

      <IntakeModal
        open={intakeOpen}
        service={activeService}
        onClose={() => setIntakeOpen(false)}
      />

      <main>
        <Hero
          onRequestAccess={() => openIntake(null)}
          onAudit={() => openIntake(null)}
        />
        <Systems onSelect={(s) => openIntake(s)} />
        <Pipeline />
        <Payment />
        <Trust />
        <Contact />
      </main>

      <Footer onOpenIntake={() => openIntake(null)} />
    </>
  );
}
