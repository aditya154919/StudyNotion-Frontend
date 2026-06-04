import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { tag } from "../Services/api";
import { apiConnector } from "../Services/apiconnector";
import { getTagCourses } from "../Services/operations/Courseapi";
import Error from "./Error";
import CourseSlider from "../components/cores/Catlog/CourseSlider";
import Footer from "../components/cores/HomePage/Footer";

const Catalog = () => {
  const { loading } = useSelector((state) => state.profile);
  const { catlogName } = useParams();
  const [active, setActive] = useState(1);
  const [catlogPageData, setCatlogPageData] = useState(null);
  const [categoryId, setCatorgyId] = useState("");

  useEffect(() => {
    const getAllTag = async () => {
      const res = await apiConnector({
        method: "GET",
        url: tag.TAG_API,
      });
      const result = res.data.data;
      console.log("Result", result);
      const category_id = result.filter(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catlogName
      )[0]._id;
      setCatorgyId(category_id);
      // console.log(catlogName, "TAGId=", category_id);
    };
    getAllTag();
  }, [catlogName]);
  console.log("Catagory id of", catlogName, "=", categoryId);

  useEffect(() => {
    const getCategoryDetails = async () => {
      const result = await getTagCourses(categoryId);
      console.log("Response data", result);
      setCatlogPageData(result);
    };
    if (categoryId) {
      getCategoryDetails();
    } else {
      // console.log("Hello");
    }
  }, [categoryId]);

  if (loading || !catlogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }
  if (!loading && !catlogPageData.success) {
    return <Error />;
  }

  return (
    <>
      {/* hero section */}
      <div className="box-content px-6 bg-[#161D29]">
        <div className="mx-auto flex min-h-50 px-15 max-w-162.5 flex-col justify-center gap-4 lg:max-w-315 ">
          <p className="text-md text-[#838894]">
            {`Home / Catalog / `}
            <span className="text-[#FFE83D]">
              {catlogPageData?.data?.selectedTagCourse?.name}
            </span>
          </p>
          <p className="text-3xl text-[#F1F2FF]">
            {catlogPageData?.data?.selectedTagCourse?.name}
          </p>
          <p className="max-w-217.5 text-[#999DAA]">
            {catlogPageData?.data?.selectedTagCourse?.description}
          </p>
        </div>
      </div>

      {/* section 1 */}
      <div className="mx-auto  box-content w-full px-8 py-8 max-w-162.5  lg:max-w-315 ">
        <div className="text-3xl font-semibold text-[#F1F2FF] lg:text-4xl">
          Courses to get you started
        </div>
         <div className="my-4 flex border-b border-b-gray-500 text-sm">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-[#FFE83D] text-[#FFE83D]"
                : "text-[#C5C7D4]"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Populer
          </p>
          <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-[#FFE83D] text-[#FFE83D]"
                : "text-[#C5C7D4]"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
         </div>
            <div>
              <CourseSlider
                Courses={catlogPageData?.data?.selectedTagCourse?.course}
              />
            </div>
      </div>
      <div className="h-0.5 m-x-2 bg-gray-300"></div>
      {/* section 2 */}
      <div className="mx-auto  box-content w-full px-8 py-8 max-w-162.5  lg:max-w-315">
          <div className="text-3xl font-semibold text-[#F1F2FF] lg:text-4xl">
            Top Courses in {catlogPageData?.data?.differentCourses?.name}
          </div>
          <div className="py-5">
            <CourseSlider
              Courses={catlogPageData?.data?.differentCourses?.course}
            />

          </div>
      </div>
      <Footer/>
    </>
  );
};

export default Catalog;
