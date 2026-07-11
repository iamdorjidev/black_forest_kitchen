import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Menu from "../components/Menu";
import Reviews from "../components/Reviews";
import Footer from "../components/Footer";
import OrderDrawer from "../components/OrderDrawer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Reviews />
      </main>
      <Footer />
      <OrderDrawer />
    </>
  );
}
