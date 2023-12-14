import React, { useEffect, useState } from "react";
import styles from "../../style";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import FarmerNavbar from "../bussinessSection/FarmerNavbar";
import { tradeVideo } from "../../assets";

const FertilizerList = () => {
  const [products, setProducts] = useState([]);
  const productCollectionRef = collection(db, "FertilizersPrice");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const data = await getDocs(productCollectionRef);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  return (
    <div className="w-full">
      <FarmerNavbar />
      <div className={`${styles.flexStart}`}>
        <video
          src={tradeVideo}
          autoPlay
          loop
          muted
          className="object-cover fixed z-[-1] w-full h-full"
        />
      </div>
      <div
        className={`flex-1 ${styles.flexCenter} flex-col xl:px-0 sm:px-16 px-3`}
      >
        <label className="flex-1 font-poppins font-bold sm:text-6xl text-l mt-0 sm:mt-2 text-white leading-8 sm:leading-16">
          Welcome To <span className="text-gradient">Fertilizers Price </span>
          Section
        </label>
      </div>
      <div className="backdrop-blur-sm sm:backdrop-blur-md px-1 pt-2 sm:px-4 sm:pt-3 pb-4 rounded-sm border border-white flex-1 m-1 mt-2">
        <h3 className="text-white text-l sm:text-3xl font-medium">
          Fertilizers Price
        </h3>
        <div className="border-x border-white rounded-sm mt-3 overflow-auto sm:h-[60vh] h-[80vh] no-scrollbar">
          <table className="w-full text-white table-auto">
            <thead className="bg-neutral-400">
              <tr>
                <th className={styles.thead}>No.</th>
                <th className={styles.thead}>Fertilizer Name</th>
                <th className={styles.thead}>Firm Name</th>
                <th className={styles.thead}>Price(Unit in Rs./50 kg bag)</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((prd) => (
                <tr key={prd.id} className="hover:backdrop-blur-2xl">
                  <td className={styles.tdata}>{products.indexOf(prd) + 1}</td>
                  <td className={styles.tdata}>{prd.FertilizerName}</td>
                  <td className={styles.tdata}>{prd.FirmName}</td>
                  <td className={styles.tdata}>{prd.Price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FertilizerList;
