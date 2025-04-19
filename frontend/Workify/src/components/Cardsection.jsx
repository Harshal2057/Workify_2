import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import React from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

//LOCALS
import { assets , Services } from "../assets/assets";

gsap.registerPlugin(ScrollTrigger);

const Cardsection = () => {
  const sliderRef = useRef(null);

  useGSAP(() => {
    if (!sliderRef.current) return;
  
    const bufferSpace = 50; // Adjust this value to control the extra space
    const totalScrollWidth = sliderRef.current.scrollWidth - sliderRef.current.offsetWidth + bufferSpace;
  
    gsap.to(sliderRef.current, {
      x: `-${totalScrollWidth}px`,
      scrollTrigger: {
        trigger: sliderRef.current,
        scroller: "body",
        start: "top 20%",
        end: `+=${totalScrollWidth}`, 
        scrub: 1,
        pin: true,
      },
    });
  }, [Services]);
  
  

  return (
    <>
   
      <div ref={sliderRef} className="w-full max-h-max flex gap-20 mt-14 mr-14 mb-14">

      <div className="absolute lg:w-2/6 left-[10%] top-32 mr-10 border-1 border-black font-[Outfit] p-5 flex flex-col gap-5">
        <div>
        <p className="font-bold text-4xl">Expert Services, Exceptional Results</p>
        <p className="font-semibold">Find top freelancers for your next big project!</p>
        </div>
       
       <div>
       <p className="hidden lg:block font-light">Whether you need a stunning website, eye-catching designs, or expert marketing strategies, our skilled freelancers deliver top-tier results tailored to your needs.</p>
       </div>
      
      </div>

        {Services.map((card , id) => {
          return (
            <div key={id} className="slider">
              <div className="relative w-[97vw] md:w-[80vw] xl:w-[50vw] h-[75vh] md:h-[35vh] xl:h-[60vh]  p-5 rounded-3xl overflow-hidden translate-x-full"
              style={{backgroundColor: card.color}}
              >
                    <div className="flex flex-col justify-items-start p-2 ">
                      <ul className=" flex items-center gap-2 text-white text-2xl">
                        <img src={assets.web_dev_1} className="size-[3rem]"/>
                        <li> <p className="text-white font-semibold text-4xl">{card.title}</p></li>
                      </ul>

                      <hr className="text-white" />

                      <div className="flex flex-col gap-2 mt-9 mb-9">
                        <p className="text-white font-medium text-xl">{card.description}</p>
                        <p className="text-white font-medium text-xl">{card.performance}</p>
                      </div>

                      <hr className="text-white" />
                     
                      <div className="mt-6 flex gap-8 mb-9">
                        {
                          card.tools.map((tool , id) => {
                             return <ul key={id} className="list-disc text-white">
                               <li>{tool}</li>
                              </ul>
                          })
                        }
                      </div>

                      <hr className="text-white" />

                      <div className="mt-9 flex flex-col gap-4 text-xl">
                        <div>
                          <p className="font-semibold text-2xl text-white">Results</p>
                        </div>

                        <div className="flex text-white gap-10">
                          <div><p>Ratings : {card.rating}</p></div>
                          <div><p>Projects completed : {card.projectsCompleted}</p></div>
                        </div>
                      </div>
               
                    </div>


              </div>
            </div>
          );
        })}
      </div>


    </>
  );
};

export default Cardsection;
