import Navbars from "../components/navbar";
import Products from "../components/products";
import Services from "../components/services";
import About from "../components/about";
import CategoriesCo from "../components/categoriesCo";
import CommentForm from "../components/commentForm";
import Footer from "../components/footer";
import Hero from "../components/hero";
function Home() {
  const scrollLeft = (element) => {
    document.querySelector(`.${element}`).scrollBy({
      top: 0,
      left: -(window.innerWidth * 0.5),
      behavior: "smooth",
    });
  };
  const scrollRight = (element) => {
    document.querySelector(`.${element}`).scrollBy({
      top: 0,
      left: window.innerWidth * 0.5,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <Navbars />
      <Hero />
      <Products right={scrollRight} left={scrollLeft} />
      <Services />
      <CategoriesCo right={scrollRight} left={scrollLeft} />
      <About />
      <CommentForm right={scrollRight} left={scrollLeft} />
      <Footer />
    </div>
  );
}

export default Home;
