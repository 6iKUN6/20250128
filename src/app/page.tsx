import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import Content from "@/components/layouts/content";

export default function Home() {
  return (
    <div className="size-full">
      <Header></Header>
      <div className="bg-[#f7f5ee] text-black">
        <Content></Content>
      </div>
      <Footer></Footer>
    </div>
  );
}
