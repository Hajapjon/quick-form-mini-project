import moviesdata from "../data/moviesdata";

export default function RadioButton({
  selectedOption,
  setSelectedOption,
  className,
}) {
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <fieldset className={`p-4 rounded ${className}`}>
      <legend className="font-medium mb-2">
        เลือกหนังที่คุณชอบ <span className="text-red-500">*</span>
      </legend>

      <div className="flex flex-col gap-3">
        {moviesdata.map((movie) => (
          <label key={movie.title} className="flex items-start gap-3">
            <input
              type="radio"
              name="option"
              value={movie.title}
              checked={selectedOption === movie.title}
              onChange={handleChange}
              className="mt-1"
            />
            <div>
              <div className="font-semibold">
                {movie.title} ({movie.year})
              </div>
              <div className="text-sm text-gray-500">
                Director: {movie.director}
              </div>
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
