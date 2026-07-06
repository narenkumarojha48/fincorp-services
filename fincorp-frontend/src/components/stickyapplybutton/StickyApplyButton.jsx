import "./stickyApplyButton.css";

const StickyApplyButton = () => {

  const scrollToForm = () => {
    const form = document.getElementById("hero-form");

    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button className="sticky-apply-btn" onClick={scrollToForm}>
      Apply Now
    </button>
  );
};

export default StickyApplyButton;