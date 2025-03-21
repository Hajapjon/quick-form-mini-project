import { useState } from "react";
import RadioButton from "./RadioButton";
import { Button } from "./ui/button";

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false); // For Success Page

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "โปรดใส่ชื่อของคุณ";
    }

    if (!email.trim()) {
      newErrors.email = "โปรดใส่อีเมลของคุณ";
    } else if (!validateEmail(email)) {
      newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    }

    if (!selectedOption) {
      newErrors.option = "กรุณาเลือกหนังที่คุณชอบ";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setComment("");
    setSelectedOption("");
    setErrors({});
    setSubmitted(false);
  };

  // Success Page
  if (submitted) {
    return (
      <section className="flex items-center justify-center w-full h-screen">
        <div className="form border mx-auto  bg-white rounded shadow  lg:w-1/3 w-full flex flex-col justify-between gap-2">
          <h1 className="bg-gradient-to-r from-purple-700 to-blue-700 text-white font-bold text-xl flex items-center justify-center px-4 py-6 rounded-t">
            Movie Survey
          </h1>
          <div className="border bg-green-100 border-green-300 p-2 mx-6 flex flex-col gap-2 rounded-xl mt-8">
            <h2>ส่งแบบสำรวจสำเร็จ!</h2>
            <p>
              <span className="text-gray-500">ชื่อ:</span> {name}
            </p>
            <p>
              <span className="text-gray-500">อีเมล:</span> {email}
            </p>
            <p>
              <span className="text-gray-500">หนังที่ชอบ:</span>{" "}
              {selectedOption}
            </p>
            {comment && (
              <p>
                <span className="text-gray-500">ความคิดเห็น:</span> {comment}
              </p>
            )}
          </div>
          <div className="p-4 mb-4">
            <Button
              onClick={handleReset}
              className="mt-6 bg-black text-white w-full "
            >
              เริ่มทำแบบสำรวจใหม่
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="form border w-full lg:w-1/4  flex flex-col gap-2  bg-white shadow rounded">
      <h1 className="bg-gradient-to-r from-purple-700 to-blue-700 text-white font-bold text-xl flex items-center px-4 py-6">
        Movie Survey
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col mt-4 gap-3 px-4">
        {/* Name */}
        <label htmlFor="name">
          ชื่อ <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          placeholder="กรุณากรอกชื่อของคุณ"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`!border border-gray-300 p-2 rounded ${
            errors.name ? "border-red-500" : "border-0"
          }`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        {/* Email */}
        <label htmlFor="email">
          อีเมล <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          placeholder="Example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`!border border-gray-300 p-2 rounded ${
            errors.email ? "border-red-500" : "border-0"
          }`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        {/* Favourite */}
        <RadioButton
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          className={`border border-gray-300 p-2 rounded ${
            errors.option ? "border-red-500" : "border-0"
          }`}
        />
        {errors.option && (
          <p className="text-red-500 text-sm">{errors.option}</p>
        )}

        {/* Comment */}
        <label htmlFor="comment">ความคิดเห็นเกี่ยวกับหนัง</label>
        <textarea
          id="comment"
          placeholder="พิมพ์ความคิดเห็นของคุณที่นี่..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="3"
          className="border border-gray-300 p-2 rounded"
        ></textarea>

        {/* Button */}
        <div className="flex justify-between mt-5 px-4 border-t border-gray-300 pt-4 mb-4">
          <Button
            type="button"
            onClick={handleReset}
            className="w-24 bg-white border border-gray-300 text-black"
          >
            รีเซ็ต
          </Button>

          <Button
            type="submit"
            className="w-36 bg-gradient-to-r from-purple-700 to-blue-700 p-4 rounded text-white"
          >
            ส่งแบบสำรวจ
          </Button>
        </div>
      </form>
    </section>
  );
}

export default Form;
