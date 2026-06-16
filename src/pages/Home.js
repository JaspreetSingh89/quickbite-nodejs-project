import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const loadData = async () => {
    const response = await fetch("http://localhost:5000/api/displayData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setFoodCategory(data.foodCategory);
    setFoodItems(data.foodItems);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div id="carousel" className="carousel slide" data-bs-ride="carousel">
          <div
            className="carousel-caption d-none d-md-block"
            style={{ zIndex: "10" }}
          >
            <div className="d-flex gap-2 justify-content-center">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />

              <button className="btn btn-success text-white" type="submit">
                Search
              </button>
            </div>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://picsum.photos/900/700"
                className="d-block w-100"
                alt=""
                style={{
                  height: "500px",
                  objectFit: "cover",
                  filter: "brightness(40%)",
                }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://picsum.photos/900/700"
                className="d-block w-100"
                alt=""
                style={{
                  height: "500px",
                  objectFit: "cover",
                  filter: "brightness(40%)",
                }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://picsum.photos/900/700"
                className="d-block w-100"
                alt=""
                style={{
                  height: "500px",
                  objectFit: "cover",
                  filter: "brightness(40%)",
                }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCategory.length > 0 ? (
          foodCategory.map((data) => {
            return (
              <div key={data._id} className="row mb-3">
                <div className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {foodItems.length > 0 ? (
                  foodItems
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name
                          .toLowerCase()
                          .includes(search.toLocaleLowerCase()),
                    )
                    .map((filteredItem) => {
                      return (
                        <div
                          key={filteredItem._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            foodItem = {filteredItem}
                            options={filteredItem.options[0]}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div>No data found</div>
                )}
              </div>
            );
          })
        ) : (
          <div>No data found</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
