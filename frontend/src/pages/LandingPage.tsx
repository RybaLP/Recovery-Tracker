import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/logos.png";
import { Card, CardTitle } from "@/components/ui/card";
import { FaArrowRight } from "react-icons/fa6";
import { useTheme } from "@/components/themeProvider";
import { Si1001Tracklists } from "react-icons/si";
import { CiStar } from "react-icons/ci";
import { FaTrophy } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";

const LandingPage = () => {
  const { theme } = useTheme();
  const darkMode = theme === "dark";
  const cardHoverAnimationClass = darkMode
    ? "card-hover-animation-dark"
    : "card-hover-animation-light";

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto py-24 px-8">
        <header className="grid grid-cols-1 md:grid-cols-2 items-start md:items-center gap-16">
          <div
            className="text-center md:text-left"
            style={{ animation: "slideIn 0.8s ease-out forwards 0.3s" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-6">
              Never Give Up on <span className="text-orange-500">Your Dreams</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 transition-all duration-300 ease-in-out hover:text-orange-500 hover:opacity-100 opacity-80 cursor-pointer">
              You can achieve anything you set your mind to; you just need to believe in yourself and work hard. This website is for anyone ready to make a change in their life and pursue their future goals!
            </p>
            <div className="flex justify-center items-center">
              <FaArrowRight
                style={{ animation: "bounce 1s infinite" }}
                className="text-orange-500 text-lg"
                size={47}
              />
              <Button className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1">
                Get Started
              </Button>
            </div>
          </div>

          <div
            className="flex items-center justify-center md:justify-end"
            style={{ animation: "slideInFromRight 0.8s ease-out forwards 0.3s" }}
          >
            <Card
              className={`p-8 md:p-10 w-full md:w-96 shadow-xl rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out ${cardHoverAnimationClass}`}
            >
              <CardTitle className="text-xl font-semibold mb-4">
                Do you feel trapped by your habits?
              </CardTitle>

              <img
                src={Logo}
                alt="Addiction support"
                className="relative z-10 rounded-md shadow-md w-32 h-auto mx-auto mb-4"
              />

              <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
                It's okay to admit it. Many of us struggle with habits that feel impossible to break, but you don't have to face them alone.
              </p>

              <p className="text-gray-700 dark:text-gray-300 text-center mb-4">
                Our Recovery Tracker is here to help you take control of your life and overcome your challenges.
              </p>

              <div className="flex justify-center mt-6">
                <Button className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1">
                  Learn More
                </Button>
              </div>
            </Card>
          </div>
        </header>
      </div>

      <section className="p-20 bg-black text-white flex items-center flex-col gap-5">
        <h1 className="text-3xl font-bold">Why Choose Us?</h1>
        <p className="text-lg text-center max-w-md">
          We offer effective support to help people overcome their addictions.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-10 transition-transform ease-in">
          <div className="flex flex-col items-center">
            <Si1001Tracklists size={47} />
            <h3 className="mt-2">Free Support</h3>
          </div>

          <div className="flex flex-col items-center">
            <CiStar size={47} />
            <h3 className="mt-2">Excellent Service</h3>
          </div>

          <div className="flex flex-col items-center">
            <FaTrophy size={47} />
            <h3 className="mt-2">Rewarding Success</h3>
          </div>

          <div className="flex flex-col items-center">
            <AiFillLike size={47} />
            <h3 className="mt-2">Progress Tracking</h3>
          </div>
        </div>
      </section>

      <article className="py-16 px-8 md:px-24 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Discover the Power of Transformation with Our Recovery Plan
          </h2>
          <p className="text-lg mb-6">
            Are you ready to take back control and build a future free from unwanted habits? Our comprehensive recovery plan is designed to support you every step of the way. We offer proven strategies, tools, and resources to help you understand your challenges, set realistic goals, and stay motivated.
          </p>
          <ul className="list-disc pl-6 mb-8 text-left space-y-2">
            <li>Gain a deeper understanding of your habits and their triggers.</li>
            <li>Discover effective techniques for coping with challenges and temptations.</li>
            <li>Learn to build healthy coping mechanisms and replacement habits.</li>
            <li>Join a supportive community of individuals on a similar journey.</li>
            <li>Track your progress and celebrate every milestone.</li>
          </ul>
          <Button className="bg-orange-500 text-white font-semibold py-3 px-8 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1">
            Explore Our Step-by-Step Plan
          </Button>
        </div>
      </article>
    </div>
  );
};

export default LandingPage;
