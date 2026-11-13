import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import { apiConnector } from "../../../Services/apiconnector";
import { tag } from "../../../Services/api";

const TopCards = () => {
  const navigate = useNavigate(); // 2. Initialize the navigation function
  const [subLinks, setSubLinks] = useState([]);
  
  // 3. Keep track of the full selected random tag object instead of just the name string
  const [randomCourse, setRandomCourse] = useState(null);
  
  useEffect(() => {
    (async () => {
      try {
        const result = await apiConnector({ method: "GET", url: tag.TAG_API });
        const fetchedTags = result.data.data;
        
        setSubLinks(fetchedTags);

        if (fetchedTags && fetchedTags.length > 0) {
          const randomIndex = Math.floor(Math.random() * fetchedTags.length);
          // Store the whole object (contains name, id, etc.)
          setRandomCourse(fetchedTags[randomIndex]);
        }
      } catch (error) {
        console.log("Could not fetch Tag list", error);
      }
    })();
  }, []);

  // 4. Click handler to push user to the dynamic route
  const handleCardClick = () => {
    // Modify "/courses/" to match your actual route path setup (e.g., randomCourse.slug)
    if (randomCourse?._id) {
      navigate(`/catalog/${randomCourse.name.split(" ").join("-").toLowerCase()}`); 
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-5 mb-8">
      <div className="h-40 rounded-3xl bg-linear-to-r from-yellow-200 to-yellow-100 p-6 text-black">
        <h2 className="text-3xl font-bold">Unlock Full Experience</h2>
        <p className="mt-4 text-xl">₹583.25/month</p>
      </div>

      <div className="h-40 rounded-3xl bg-linear-to-r from-blue-900 to-purple-900 p-6">
        <h2 className="text-3xl font-bold">LeetCode at Your Fingertips</h2>
      </div>

      {/* 5. Added onClick, cursor styling, and hover feedback */}
      <div 
        onClick={handleCardClick}
        className="h-40 rounded-3xl bg-linear-to-r from-green-700 to-green-500 p-6 cursor-pointer hover:opacity-90 transition-all active:scale-98"
      >
        <h2 className="text-3xl font-bold">
          {randomCourse ? `${randomCourse.name} Course` : "Loading Course..."}
        </h2>
      </div>
    </div>
  );
};

export default TopCards;
