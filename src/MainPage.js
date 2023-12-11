import React from "react";
import styles from "./style";
import {
  Navbar,
  Billing,
  CardDeal,
  Business,
  Clients,
  CTA,
  Stats,
  Footer,
  Testimonials,
  Hero,
} from "./components/homeSection";
import { bgVideo } from "./assets";
import { auth } from "./firebase";
const MainPage = () => (
  <div className="w-full ">
    <Navbar />
    <div className={`${styles.flexStart} mainContainer`}>
      <video
        src={bgVideo}
        autoPlay
        loop
        muted
        className="object-cover fixed z-[-1] w-full h-full"
      />
      <div className={` ${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>
    <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Stats /> <Business /> <Billing /> <CardDeal />
        <Testimonials />
        <Clients />
        {/* <CTA />
        <Footer /> */}
        {auth.currentUser ? <p></p> : <CTA />} <Footer />
      </div>
    </div>
  </div>
);

export default MainPage;
