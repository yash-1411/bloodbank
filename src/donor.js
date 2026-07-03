import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Donor() {

  const router = useRouter();
  const { name } = router.query;

  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!name) return;

    async function getDonor() {

      try {

        const res = await fetch("http://localhost:5000/get_donordetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name
          })
        });

        const data = await res.json();

        setDonor(data);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    }

    getDonor();

  }, [name]);

  if (loading) return <h2>Loading...</h2>;

  if (!donor || donor.message)
    return <h2>Donor Not Found</h2>;

  return (

    <div
      style={{
        width: "500px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid gray",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px lightgray"
      }}
    >

      <h1>Donor Details</h1>

      <hr />

      <p><b>Name :</b> {donor[0]}</p>

      <p><b>USN :</b> {donor[1]}</p>

      <p><b>Date of Birth :</b> {donor[2]}</p>

      <p><b>Gender :</b> {donor[3]}</p>

      <p><b>Location :</b> {donor[4]}</p>

      <p><b>Blood Group :</b> {donor[5]}</p>

      <p><b>Contact :</b> {donor[6]}</p>

    </div>

  );

}
