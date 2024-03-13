
export default function CreateCourse() {
    const [name, setName] = useState('');
    const createCourse = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        // await fetch('http://localhost:3001/courses', {
        //     method: 'POST',
        //     body: formData
        // });
        console.log(formData)
        }
  return (
    <>
    <form onSubmit={createCourse} method="POST" encType="multipart/form-data">
        <div className="container w-full mx-auto grid grid-cols-3 gap-4 rounded py-4">
          <label htmlFor="name">Course Name <span className="text-gray-500">*</span>
            <input type="text" id="name" onChange={(e) => setName(e.target.value)} placeholder="Name" />
          </label>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-7 rounded-3xl">Create</button>
      </form>
    </>
  )
}
