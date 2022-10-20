import Dialogs from "./Dialogs";
import Header from "./Header";

const Home = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-y-scroll">
        <Dialogs />
      </main>
    </div>
  );
};

export default Home;
