import "./FryingPanLoader.css";

const FryingPanLoader = () => {
  return (
    <div className="loader-wrapper">
      <div className="pan-container">

        <div className="handle"></div>

        <div className="pan">
          <div className="pan-inner"></div>
        </div>

        {/* Veggies */}
        <div className="food mushroom"></div>
        <div className="food broccoli"></div>
        <div className="food broccoli-small"></div>

      </div>
    </div>
  );
};

export default FryingPanLoader;
