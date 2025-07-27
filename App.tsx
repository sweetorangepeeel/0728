import { useState, useEffect } from "react";
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Test data with design scenarios
const originalTestData = [
  {
    id: 1,
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/bb08f7186702393.6579f7ee1ce17.jpg",
    backgroundColor: "#F1F1F1",
    correctAnswer: "bad" as const,
    description: "Modern design composition"
  },
  {
    id: 2,
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/866f36202522741.668721d176bde.png",
    backgroundColor: "#F1F1F1",
    correctAnswer: "bad" as const,
    description: "Package design layout"
  },
  {
    id: 3,
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/13b036230860627.687eb90fc2748.jpg",
    backgroundColor: "#f8f9fa",
    correctAnswer: "bad" as const,
    description: "Minimal product layout"
  },
  {
    id: 4,
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c7bf5b148347043.62d439feb4444.jpg",
    backgroundColor: "#CFCAC6",
    correctAnswer: "bad" as const,
    description: "Editorial design layout"
  },
  {
    id: 5,
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/2ed726217848233.6797b78b1a80c.jpg",
    backgroundColor: "#F1F1F1",
    correctAnswer: "bad" as const,
    description: "Elegant brand identity"
  },
  {
    id: 6,
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/0651c2196781309.662616ba037e8.jpg",
    backgroundColor: "#000000",
    correctAnswer: "bad" as const,
    description: "Fresh produce branding design"
  },
  {
    id: 7,
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/1e9578171784431.64a464d7197e1.jpg",
    backgroundColor: "#f9f9f9",
    correctAnswer: "bad" as const,
    description: "Sophisticated poster design"
  },
  {
    id: 8,
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/693280228101579.685ed10b7635a.png",
    backgroundColor: "#F1F1F1",
    correctAnswer: "bad" as const,
    description: "Professional brand identity design"
  },
  {
    id: 9,
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/47e9f6140930137.624ae5e322838.jpg",
    backgroundColor: "#f2f2f2",
    correctAnswer: "bad" as const,
    description: "Contemporary design layout"
  },
  {
    id: 10,
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/a6365c230720713.687bdd984b8ca.jpeg",
    backgroundColor: "#ffffff",
    correctAnswer: "bad" as const,
    description: "Cohesive brand application"
  },
  {
    id: 11,
    image: "https://visualjournal.it/content/home/8_2020/5_thesisbeer/1.jpg",
    backgroundColor: "#FEE2CD",
    correctAnswer: "good" as const,
    description: "Harmonious color palette"
  },
  {
    id: 12,
    image: "https://visualjournal.it/content/home/13_2025/49_elica/1.jpg",
    backgroundColor: "#F1F1F1",
    correctAnswer: "good" as const,
    description: "Londrina EC Rebranding design"
  },
  {
    id: 13,
    image: "https://visualjournal.it/content/home/10_2022/4_uystudio/8.jpg",
    backgroundColor: "#000000",
    correctAnswer: "good" as const,
    description: "Strong typographic hierarchy"
  },
  {
    id: 14,
    image: "https://visualjournal.it/content/home/12_2024/157_flowerboy/6.jpg",
    backgroundColor: "#f6f6f6",
    correctAnswer: "good" as const,
    description: "Effective use of white space"
  },
  {
    id: 15,
    image: "https://visualjournal.it/content/home/8_2020/40_warsawghettomuseum/6.jpg",
    backgroundColor: "#F1ECE8",
    correctAnswer: "good" as const,
    description: "Refined layout composition"
  },
  {
    id: 16,
    image: "https://visualjournal.it/content/home/13_2025/24_vessi/4.jpg",
    backgroundColor: "#F6F0EA",
    correctAnswer: "good" as const,
    description: "Professional brand identity"
  },
  {
    id: 17,
    image: "https://visualjournal.it/content/home/13_2025/51_marievik/4.jpg",
    backgroundColor: "#f7f7f7",
    correctAnswer: "good" as const,
    description: "Thoughtful information design"
  },
  {
    id: 18,
    image: "https://visualjournal.it/content/home/11_2023/14_mindbloom/1.jpg",
    backgroundColor: "#f4f4f4",
    correctAnswer: "good" as const,
    description: "Exceptional visual balance"
  },
  {
    id: 19,
    image: "https://visualjournal.it/content/home/12_2024/44_oad/9a.jpg",
    backgroundColor: "#000000",
    correctAnswer: "good" as const,
    description: "Masterful use of typography"
  },
  {
    id: 20,
    image: "https://visualjournal.it/content/home/13_2025/89_nownow/8.jpg",
    backgroundColor: "#000000",
    correctAnswer: "good" as const,
    description: "Creative studio design composition"
  }
];

// Starting frame component for homepage
function StartingFrame() {
  return (
    <div className="absolute h-[845px] left-[447px] overflow-clip rounded-[10px] top-[43px] w-[944px]">
      {/* Background frame */}
      <div 
        className="absolute h-[845px] left-0 rounded-[10px] top-0 w-[944px]"
        style={{ backgroundColor: '#f2f2f2' }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-8">👁️</div>
          <div 
            className="font-['SF_Pro_Text:Light',_sans-serif] text-[#474747] text-[24px] mb-4"
            style={{ letterSpacing: '-0.72px' }}
          >
            Ready to test your design eye?
          </div>
          <div 
            className="font-['SF_Pro_Text:Light',_sans-serif] text-[#474747] text-[16px] leading-[1.4] max-w-[400px]"
            style={{ letterSpacing: '-0.48px' }}
          >
            You'll see 20 design examples. Judge each one as "Good" or "Bad" based on your aesthetic instincts.
          </div>
        </div>
      </div>
    </div>
  );
}

// Desktop Frame1 component with test images
function Frame1({ currentTest }: { currentTest: typeof originalTestData[0] }) {
  const getImageScale = (id: number) => {
    const scales: Record<number, number> = {
      1: 1.914008789025,
      2: 1.887662109375,
      3: 1.25,
      4: 1.16049375,
      6: 1.104,
      7: 1.61,
      8: 1.61,
      9: 1.98375,
      10: 2.07,
      11: 0.98195625,
      12: 1.5525,
      14: 1.61,
      15: 0.93196575,
      16: 0.996685588,
      17: 1.535879510,
      18: 1.3466905087,
      19: 1.294396875,
      20: 1.5331325625
    };
    return scales[id] || 1;
  };

  const scale = getImageScale(currentTest.id);
  
  return (
    <div className="absolute h-[845px] left-[447px] overflow-clip rounded-[10px] top-[43px] w-[944px]">
      {/* Consistent background frame size for ALL images */}
      <div 
        className="absolute h-[845px] left-0 rounded-[10px] top-0 w-[944px]"
        style={{ backgroundColor: currentTest.backgroundColor }}
      />
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ImageWithFallback
          src={currentTest.image}
          alt={currentTest.description}
          style={{ 
            maxWidth: '90%',
            maxHeight: '90%',
            objectFit: currentTest.id === 3 ? 'cover' : 'contain',
            width: currentTest.id === 3 ? '90%' : 'auto',
            height: currentTest.id === 3 ? '90%' : 'auto',
            transform: `scale(${scale})`,
            display: 'block'
          }}
          onLoad={() => console.log(`Image ${currentTest.id} loaded successfully`)}
          onError={() => console.log(`Image ${currentTest.id} failed to load: ${currentTest.image}`)}
        />
      </div>
    </div>
  );
}

// Mobile starting frame for homepage
function MobileStartingFrame() {
  return (
    <div 
      style={{ 
        width: '100%',
        aspectRatio: '944/845',
        minHeight: '300px',
        maxHeight: '400px',
        overflow: 'hidden',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2'
      }}
    >
      <div className="text-center px-6">
        <div className="text-5xl mb-6">👁️</div>
        <div 
          className="font-light text-474747 mb-3"
          style={{ 
            fontSize: '20px',
            fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif'
          }}
        >
          Ready to test your design eye?
        </div>
        <div 
          className="font-light text-474747 leading-relaxed"
          style={{ 
            fontSize: '14px',
            fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif'
          }}
        >
          You'll see 20 design examples. Judge each one as "Good" or "Bad" based on your aesthetic instincts.
        </div>
      </div>
    </div>
  );
}

// Mobile image component
function MobileImageFrame({ currentTest }: { currentTest: typeof originalTestData[0] }) {
  const getImageScale = (id: number) => {
    const scales: Record<number, number> = {
      1: 1.914008789025,
      2: 1.887662109375,
      3: 1.25,
      4: 1.0142715375,
      6: 1.104,
      7: 1.61,
      8: 1.61,
      9: 1.6861875,
      10: 2.07,
      11: 0.98195625,
      12: 1.5525,
      14: 1.61,
      15: 0.93196575,
      16: 0.996685588,
      17: 1.7258625,
      18: 1.4669831323,
      19: 1.294396875,
      20: 1.5331325625
    };
    return scales[id] || 1;
  };

  const scale = getImageScale(currentTest.id);
  
  return (
    <div 
      style={{ 
        width: '100%',
        aspectRatio: '944/845',
        minHeight: '300px',
        maxHeight: '400px',
        overflow: 'hidden',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: currentTest.id === 6 ? '#000000' : currentTest.id === 4 ? '#CFCAC6' : currentTest.backgroundColor
      }}
    >
      <ImageWithFallback
        src={currentTest.image}
        alt={currentTest.description}
        style={{ 
          maxWidth: '90%',
          maxHeight: '90%',
          objectFit: currentTest.id === 3 ? 'cover' : 'contain',
          width: currentTest.id === 3 ? '90%' : 'auto',
          height: currentTest.id === 3 ? '90%' : 'auto',
          transform: `scale(${scale})`,
          display: 'block'
        }}
        onLoad={() => console.log(`Mobile image ${currentTest.id} loaded successfully`)}
        onError={() => console.log(`Mobile image ${currentTest.id} failed to load: ${currentTest.image}`)}
      />
    </div>
  );
}

export default function App() {
  const [gameState, setGameState] = useState<'homepage' | 'playing' | 'results'>('homepage');
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  
  const [testData, setTestData] = useState(() => shuffleArray(originalTestData));

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload the first 5 test images to ensure fast loading
  useEffect(() => {
    const preloadImages = async () => {
      const imagesToPreload = testData.slice(0, 5); // Preload first 5 images
      
      const preloadPromises = imagesToPreload.map((test) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Still resolve on error to not block the app
          img.src = test.image;
        });
      });

      try {
        await Promise.all(preloadPromises);
        setImagesPreloaded(true);
      } catch (error) {
        console.log('Some images failed to preload, but continuing...');
        setImagesPreloaded(true);
      }
    };

    preloadImages();
  }, [testData]);

  const currentTest = testData[currentTestIndex];
  const totalTests = testData.length;

  // Debug logging
  useEffect(() => {
    if (gameState === 'playing') {
      console.log(`Test started! Current test index: ${currentTestIndex}, Test ID: ${currentTest.id}, Image URL: ${currentTest.image}`);
    }
  }, [gameState, currentTestIndex, currentTest]);

  const handleAnswer = (answer: "bad" | "good") => {
    if (gameState === 'homepage') {
      // Starting the test - just change state, don't record answer yet
      setGameState('playing');
      return;
    }
    
    const newAnswers = [...answers, answer];
    const newScore = answer === currentTest.correctAnswer ? score + 1 : score;
    const nextIndex = currentTestIndex + 1;
    
    setAnswers(newAnswers);
    setScore(newScore);

    if (nextIndex < totalTests) {
      setCurrentTestIndex(nextIndex);
    } else {
      setGameState('results');
    }
  };

  const handleGoBack = () => {
    if (currentTestIndex > 0 && gameState === 'playing') {
      const lastAnswer = answers[answers.length - 1];
      const previousTest = testData[currentTestIndex - 1];
      
      if (lastAnswer === previousTest.correctAnswer) {
        setScore(score - 1);
      }
      
      setAnswers(answers.slice(0, -1));
      setCurrentTestIndex(currentTestIndex - 1);
    }
  };

  const canGoBack = gameState === 'playing' && currentTestIndex > 0;

  const getScorePercentage = () => {
    return Math.round((score / totalTests) * 100);
  };

  const getScoreLabel = () => {
    const percentage = getScorePercentage();
    if (percentage >= 90) return "Visual Genius 🎨";
    if (percentage >= 75) return "Design Expert 👁️";
    if (percentage >= 60) return "Creative Eye ✨";
    if (percentage >= 40) return "Style Explorer 🌱";
    return "Design Sprout 📈";
  };

  const resetTest = () => {
    setGameState('homepage');
    setCurrentTestIndex(0);
    setScore(0);
    setAnswers([]);
    setImagesPreloaded(false);
    const newTestData = shuffleArray(originalTestData);
    setTestData(newTestData);
    
    // Preload images for the new test order
    setTimeout(() => {
      const imagesToPreload = newTestData.slice(0, 5);
      const preloadPromises = imagesToPreload.map((test) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = test.image;
        });
      });
      
      Promise.all(preloadPromises).then(() => {
        setImagesPreloaded(true);
      });
    }, 100);
  };

  if (gameState === 'results') {
    return (
      <div className="bg-white relative w-full h-screen flex items-center justify-center p-4">
        <div className="bg-f2f2f2 rounded-lg p-12 text-center max-w-2xl w-full">
          <h1 className="text-5xl mb-6 text-474747 font-light tracking-tight">Test Complete! 🎉</h1>
          <div className="text-7xl mb-6 text-black font-light">
            {getScorePercentage()}%
          </div>
          <h2 className="text-3xl mb-6 text-474747 font-light tracking-tight">{getScoreLabel()}</h2>
          <p className="text-lg mb-12 text-474747 tracking-tight">
            You scored {score} out of {totalTests} correct
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={resetTest}
              className="bg-white text-black px-8 py-4 rounded-full border-none cursor-pointer font-light transition-colors btn-hover"
              style={{ fontSize: '18px' }}
            >
              Take Test Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white relative w-full ${isDesktop ? 'h-screen overflow-hidden' : 'min-h-screen'} flex justify-center`}>
      {/* Desktop Layout - Using original Figma structure */}
      {isDesktop && (
        <div className="bg-[#ffffff] relative size-full" style={{ width: '1391px', height: '100%' }}>
          {/* Background frames from original Figma */}
          <div className="absolute bg-[#f2f2f2] h-[87.225px] left-[446.662px] rounded-[11.265px] top-[908.93px] w-[944.354px]" />
          <div className="absolute bg-[#f2f2f2] h-[137.555px] left-[48.984px] rounded-[10.241px] top-[43.464px] w-[383.451px]" />
          <div className="absolute bg-[#f2f2f2] h-[507.274px] left-[48.984px] rounded-[10.241px] top-[194.859px] w-[383.451px]" />
          <div className="absolute bg-[#f2f2f2] h-[169.746px] left-[48.984px] rounded-[10.241px] top-[718.254px] w-[383.451px]" />
          <div className="absolute bg-[#f2f2f2] h-[87.225px] left-[48.984px] rounded-[10.241px] top-[908.93px] w-[383.451px]" />
          
          {/* Title - ORIGINAL FIGMA CONTENT */}
          <div className="absolute font-['SF_Pro_Text:Light',_sans-serif] h-[80.384px] leading-none left-[71.562px] not-italic text-[#474747] text-[37.013px] text-left top-[80.241px] tracking-[-1.8507px] w-[351.846px]">
            <p className="adjustLetterSpacing block mb-0">Is your design</p>
            <p className="adjustLetterSpacing block">eye even good? 👁️</p>
          </div>

          {/* Information section - ORIGINAL FIGMA CONTENT */}
          <div className="absolute font-['SF_Pro_Text:Light',_sans-serif] h-[330.207px] leading-[1.3] left-[71.562px] not-italic text-[#474747] text-[16.529px] text-left top-[244.527px] tracking-[-0.1653px] w-[321.802px]">
            <p className="adjustLetterSpacing block mb-0">{`It's everywhere, whether you notice or not. Every app you use, every website you visit, every poster you glance at - someone made hundreds of micro-decisions about spacing, color, hierarchy. Good design feels invisible and effortless. Bad design creates friction you can't quite name.`}</p>
            <p className="adjustLetterSpacing block mb-0">&nbsp;</p>
            <p className="adjustLetterSpacing block mb-0">{`The best part? Once you start noticing good design, you can't unsee it. The world becomes richer and more interesting when you understand the intentionality behind what you're looking at.`}</p>
            <p className="adjustLetterSpacing block mb-0">&nbsp;</p>
            <p className="adjustLetterSpacing block">
              Test your eye on the right ➡️
            </p>
          </div>

          {/* Rating System values - ORIGINAL FIGMA CONTENT */}
          <div className="absolute flex flex-col font-['SF_Pro_Text:Light',_sans-serif] h-[101.018px] justify-end leading-[1.3] left-[71.562px] not-italic text-[#474747] text-[16.529px] text-left top-[869.09px] translate-y-[-100%] w-[207.41px]">
            <p className="block mb-0">Visual Genius 🎨</p>
            <p className="block mb-0">Design Expert 👁️</p>
            <p className="block mb-0">Creative Eye ✨</p>
            <p className="block mb-0">Style Explorer 🌱</p>
            <p className="block">Design Sprout 📈</p>
          </div>

          {/* Rating System percentages */}
          <div className="absolute flex flex-col font-['SF_Pro_Text:Light',_sans-serif] justify-end leading-[1.3] left-[306.314px] not-italic text-[#474747] text-[16.529px] text-left text-nowrap top-[866.558px] translate-y-[-100%] whitespace-pre">
            <p className="block mb-0">90-100%</p>
            <p className="block mb-0">75-89%</p>
            <p className="block mb-0">60-74%</p>
            <p className="block mb-0">40-59%</p>
            <p className="block">Below 40%</p>
          </div>

          {/* Created by - ORIGINAL FIGMA CONTENT */}
          <div className="absolute flex flex-col font-['SF_Pro_Text:Light',_sans-serif] justify-end leading-[0] left-[71.562px] not-italic text-[#474747] text-[16.529px] text-left top-[970.548px] translate-y-[-100%] w-[207.41px]">
            <p className="block leading-[1.3]">@sweetorangepeeel</p>
          </div>

          {/* Progress counter */}
          <div className="absolute flex flex-col font-['SF_Pro_Text:Light',_sans-serif] justify-end leading-[0] left-[471.503px] not-italic text-[#474747] text-[16.529px] text-left top-[970.548px] translate-y-[-100%] w-[207.41px]">
            <p className="block leading-[1.3]">
              {gameState === 'playing' ? `${currentTestIndex + 1}/20` : `1/20`}
            </p>
          </div>

          {/* Section headers */}
          <div className="absolute font-['SF_Pro_Text',_sans-serif] h-[10.246px] leading-[0] left-[71.562px] not-italic text-[#474747] text-[14.338px] text-left top-[735.458px] tracking-[0.7169px] w-[124.928px]">
            <p className="adjustLetterSpacing block leading-[1.1] section-header-text">Rating System</p>
          </div>
          <div className="absolute font-['SF_Pro_Text',_sans-serif] h-[10.246px] leading-[0] left-[71.562px] not-italic text-[#474747] text-[14.338px] text-left top-[926.134px] tracking-[0.7169px] w-[124.928px]">
            <p className="adjustLetterSpacing block leading-[1.1] section-header-text">Created by</p>
          </div>
          <div className="absolute font-['SF_Pro_Text',_sans-serif] h-[23.413px] leading-[0] left-[471.503px] not-italic text-[#474747] text-[14.338px] text-left top-[926.134px] tracking-[0.7169px] w-[124.928px]">
            <p className="adjustLetterSpacing block leading-[1.1] section-header-text">Images</p>
          </div>
          <div className="absolute font-['SF_Pro_Text',_sans-serif] h-[10.246px] leading-[0] left-[71.562px] not-italic text-[#474747] text-[14.338px] text-left top-[213.63px] tracking-[0.7169px] w-[124.928px]">
            <p className="adjustLetterSpacing block leading-[1.1] section-header-text">Information</p>
          </div>
          <div className="absolute font-['SF_Pro_Text',_sans-serif] h-[10.246px] leading-[0] left-[71.562px] not-italic text-[#474747] text-[14.338px] text-left top-[57.836px] tracking-[0.7169px] w-[124.928px]">
            <p className="adjustLetterSpacing block leading-[1.1] section-header-text">Test yourself</p>
          </div>

          {/* Test image or starting frame */}
          {gameState === 'homepage' ? (
            <StartingFrame />
          ) : (
            <Frame1 key={currentTest.id} currentTest={currentTest} />
          )}

          {/* Buttons */}
          {gameState === 'homepage' ? (
            <div 
              className={`absolute bg-[#ffffff] h-[49.018px] rounded-[48.862px] top-[928.033px] w-[140.532px] transition-colors btn-hover ${imagesPreloaded ? 'cursor-pointer' : 'cursor-wait opacity-70'}`}
              style={{ left: '1232.76px' }}
              onClick={() => imagesPreloaded && setGameState('playing')}
            >
              <div className="absolute flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] h-[28.077px] justify-center leading-[0] left-[50%] not-italic text-[#000000] text-[20.482px] text-center top-[50%] translate-x-[-50%] translate-y-[-50%] w-[85.058px]">
                <p className="block leading-[1.1]">{imagesPreloaded ? 'Start Test' : 'Loading...'}</p>
              </div>
            </div>
          ) : (
            <>
              {canGoBack && (
                <div 
                  className="absolute bg-[#ffffff] h-[49.018px] rounded-[48.862px] top-[928.033px] w-[140.532px] cursor-pointer transition-colors btn-hover"
                  style={{ left: '930px' }}
                  onClick={handleGoBack}
                >
                  <div className="absolute flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] h-[28.077px] justify-center leading-[0] left-[50%] not-italic text-[#000000] text-[20.482px] text-center top-[50%] translate-x-[-50%] translate-y-[-50%] w-[85.058px]">
                    <p className="block leading-[1.1]">Back</p>
                  </div>
                </div>
              )}
              <div 
                className="absolute bg-[#ffffff] h-[49.018px] rounded-[48.862px] top-[928.033px] w-[140.532px] cursor-pointer transition-colors btn-hover"
                style={{ left: '1081.38px' }}
                onClick={() => handleAnswer("bad")}
              >
                <div className="absolute flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] h-[28.077px] justify-center leading-[0] left-[50%] not-italic text-[#000000] text-[20.482px] text-center top-[50%] translate-x-[-50%] translate-y-[-50%] w-[85.058px]">
                  <p className="block leading-[1.1]">Bad</p>
                </div>
              </div>
              <div 
                className="absolute bg-[#ffffff] h-[49.018px] rounded-[48.862px] top-[928.033px] w-[140.532px] cursor-pointer transition-colors btn-hover"
                style={{ left: '1232.76px' }}
                onClick={() => handleAnswer("good")}
              >
                <div className="absolute flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] h-[28.077px] justify-center leading-[0] left-[50%] not-italic text-[#000000] text-[20.482px] text-center top-[50%] translate-x-[-50%] translate-y-[-50%] w-[85.058px]">
                  <p className="block leading-[1.1]">Good</p>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Mobile Layout */}
      {!isDesktop && (
        <div className="min-h-screen flex flex-col p-4 gap-4 w-full">
          {/* Test Yourself frame */}
          <div className="bg-f2f2f2 rounded-lg p-6">
            <h1 className="text-474747 text-center font-light adjustLetterSpacing" style={{ fontSize: '28px', fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif' }}>
              Is your design eye even good? 👁️
            </h1>
          </div>

          {/* Information frame - ORIGINAL CONTENT */}
          <div className="bg-f2f2f2 rounded-lg p-6">
            <h2 className="text-474747 mb-3 font-light" style={{ fontSize: '18px', fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif' }}>
              Information
            </h2>
            <div className="space-y-2 font-light" style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif' }}>
              <p className="text-474747" style={{ fontSize: '14px' }}>
                It's everywhere, whether you notice or not. Every app you use, every website you visit, every poster you glance at - someone made hundreds of micro-decisions about spacing, color, hierarchy.
              </p>
              <p className="text-474747" style={{ fontSize: '14px' }}>
                Good design feels invisible and effortless. Bad design creates friction you can't quite name.
              </p>
              <p className="text-474747" style={{ fontSize: '14px' }}>
                The best part? Once you start noticing good design, you can't unsee it. The world becomes richer and more interesting when you understand the intentionality behind what you're looking at.
              </p>
            </div>
          </div>

          {/* Rating System frame - ORIGINAL CONTENT */}
          <div className="bg-f2f2f2 rounded-lg p-6">
            <h3 className="text-474747 mb-3 font-light" style={{ fontSize: '18px', fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif' }}>
              Rating System
            </h3>
            <div className="space-y-2 font-light" style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif' }}>
              <div className="text-474747" style={{ fontSize: '14px' }}>90-100%: Visual Genius 🎨</div>
              <div className="text-474747" style={{ fontSize: '14px' }}>75-89%: Design Expert 👁️</div>
              <div className="text-474747" style={{ fontSize: '14px' }}>60-74%: Creative Eye ✨</div>
              <div className="text-474747" style={{ fontSize: '14px' }}>40-59%: Style Explorer 🌱</div>
              <div className="text-474747" style={{ fontSize: '14px' }}>Below 40%: Design Sprout 📈</div>
            </div>
          </div>

          {/* Test image or starting frame */}
          {gameState === 'homepage' ? (
            <MobileStartingFrame />
          ) : (
            <MobileImageFrame key={currentTest.id} currentTest={currentTest} />
          )}

          {/* Mobile buttons */}
          <div className="bg-f2f2f2 rounded-lg p-6">
            {gameState === 'homepage' ? (
              <button
                onClick={() => imagesPreloaded && setGameState('playing')}
                disabled={!imagesPreloaded}
                className={`w-full bg-white text-black py-4 rounded-full border-none font-light btn-active transition-colors touch-manipulation ${imagesPreloaded ? 'cursor-pointer' : 'cursor-wait opacity-70'}`}
                style={{ 
                  fontSize: '16px',
                  fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif'
                }}
              >
                {imagesPreloaded ? 'Start test' : 'Loading...'}
              </button>
            ) : (
              <div className="flex gap-4">
                {canGoBack && (
                  <button
                    onClick={handleGoBack}
                    className="bg-white text-black px-6 py-4 rounded-full border-none cursor-pointer font-light btn-active transition-colors touch-manipulation"
                    style={{ 
                      fontSize: '14px',
                      fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif'
                    }}
                  >
                    Back
                  </button>
                )}
                <button 
                  onClick={() => handleAnswer("good")}
                  className="flex-1 bg-white text-black py-4 rounded-full border-none cursor-pointer font-light btn-active transition-colors touch-manipulation"
                  style={{ 
                    fontSize: '16px',
                    fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif'
                  }}
                >
                  Good
                </button>
                <button 
                  onClick={() => handleAnswer("bad")}
                  className="flex-1 bg-white text-black py-4 rounded-full border-none cursor-pointer font-light btn-active transition-colors touch-manipulation"
                  style={{ 
                    fontSize: '16px',
                    fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif'
                  }}
                >
                  Bad
                </button>
              </div>
            )}
          </div>

          {/* Created By frame - ORIGINAL CONTENT */}
          <div className="bg-f2f2f2 rounded-lg p-4">
            <p 
              className="text-474747 text-center font-light"
              style={{ 
                fontSize: '14px',
                fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif'
              }}
            >
              @sweetorangepeeel
            </p>
          </div>
        </div>
      )}
    </div>
  );
}