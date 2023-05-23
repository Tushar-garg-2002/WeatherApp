import { useRef, useState } from "react";
//all weather images are in /public/images
//any other image is stored in /src/assets/images


//api key for open weather api
const API_KEY = "93ef97fc6ee2b8e4888c0ef0148bd079";


// Weather function/widget that can be used anywhere
const Weather = () => {
  // Dictionary
  // Mappind weather to the location of respective image
  const WeatherImage = [
    {
      id: "Clear",
      img: "/images/Clear.png",
    },
    {
      id: "Breeze",
      img: "/images/Breeze.png",
    },
    {
      id: "Clouds",
      img: "/images/Clouds.png",
    },
    {
      id: "Drizzle",
      img: "/images/Drizzle.png",
    },
    {
      id: "Haze",
      img: "/images/Haze.png",
    },
    {
      id: "Rain",
      img: "/images/Rain.png",
    },
    {
      id: "Snow",
      img: "/images/Snow.png",
    },
    {
      id: "Thunder",
      img: "/images/Thunder.png",
    },
    {
      id: "Not Found",
      img: "/images/Notfound.png",
    },
  ];
  // define a prop to store data fetched from api
  const [apidata, SetapiData] = useState(null);
  // store input taken from user
  const inputRef = useRef(null);
  // deinfe a prop to store the weather and location of image
  const [showWeather, SetshowWeather] = useState(null);
  // define a prop to store the loading state
  const [loading, setLoading] = useState(false);
  //function to fetch data
  const fetchData = async () => {
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${API_KEY}`;
    setLoading(true);
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        SetapiData(null);
        //finds the corresponding value in WeatherImages and stores it in showWeather
        SetshowWeather(
          WeatherImage.filter((image) => image.id === data.weather[0].main)
        );
        SetapiData(data);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        //use to catch error
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="grid h-screen place-items-center">
        <div className="w-96 bg-stone-950 opacity-90 place-items-center p-3 rounded-2xl hover:opacity-100">
          <div className="flex justify-between">
            {/* Input area to take in pincode or city name */}
            <input
              type="text"
              ref={inputRef}
              className="bg-stone-950 text-white text-2xl font-mono uppercase"
              placeholder="Enter Place"
            />
            {/* Button to instruct the code to fetch results */}
            <button
              onClick={fetchData}
              className="text-xl w-12 h-12 border-l border-white pl-4"
            >
              <img src={require("./images/search.png")} alt="Search"></img>
            </button>
          </div>
          <div
            className={`duration-300 delay-75 overflow-hidden ${
              showWeather ? "h-auto" : "h-0"
            }`}
          >
            {/* First check if loading is over or not */}
            {loading ? (
              <div className="text-l text-slate-500">
                Loading..
                <div className="flex flex-col place-items-center justify-between">
                  <img
                    className="w-72 self-center animate-spin"
                    src="/images/loading.png"
                    alt="loading"
                  ></img>
                </div>
              </div>
            ) : (
              showWeather && (
                <>{/* only gets executed if showweather has certain value*/}
                  <div className="place-items-center text-white">
                    <div className="flex flex-col text-center place-items-center text-white gap-6 mt-4 justify-between">
                      {/* if the data demanded is invalid so display error*/}
                      {!apidata && (
                        <img
                          className="w-72 pb-2"
                          alt={WeatherImage[8]?.id}
                          src={WeatherImage[8]?.img}
                        ></img>
                      )}
                      {/* Else execute code */}
                      {apidata && (
                        <>
                          <img
                            className="w-72 border-b pb-5 border-white"
                            alt={showWeather[0]?.id}
                            src={showWeather[0]?.img}
                          ></img>
                          <div className="flex flex-col place-items-center justify-between gap-1">
                            <div className="flex flex-col-2 place-items-center">
                              <h1 className="text-7xl">{apidata?.main.temp}</h1>
                              <img
                                className="w-8 h-8 invert"
                                alt="*C"
                                src={require("./images/thermometer.png")}
                              ></img>
                            </div>
                            <h1 className="text-4xl font-bold tracking-wider uppercase">
                              {showWeather[0]?.id}
                            </h1>
                          </div>
                          <div className="flex flex-col-3 justify-between gap-6 pb-4">
                            <div className="flex flex-col">
                              <h1>Min. Temp</h1>
                              <h1 className="font-bold text-3xl ">
                                {apidata?.main.temp_max}
                              </h1>
                            </div>
                            <div className="flex flex-col">
                              <h1>Max. Temp</h1>
                              <h1 className="font-bold text-3xl">
                                {apidata?.main.temp_min}
                              </h1>
                            </div>
                            <div className="flex flex-col">
                              <h1>Humidity</h1>
                              <h1 className="font-bold text-3xl">
                                {apidata?.main.humidity}
                              </h1>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
