import { useEffect, useState } from "react"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useSnackbar } from "notistack"

const EditBook = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`https://mern-bookstore-server.vercel.app/books/${id}`)
            .then(res => {
                setTitle(res.data.title);
                setAuthor(res.data.author);
                setPublishYear(res.data.publishYear);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }, [])
    
    const handleEditBook = () => {
        const newBook = {
            title,
            author,
            publishYear
        }
        setLoading(true);
        axios.put(`https://mern-bookstore-server.vercel.app/books/${id}`, newBook)
            .then(() => {
                setLoading(false);
                navigate('/');
                enqueueSnackbar('Book Edited Successfully', { 
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                });
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }
    
    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-4">Edit Book</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">Title</label>
                        <input 
                            type="text"
                            className="border-2 border-gray-500 px-4 py-2 w-full"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">Author</label>
                        <input 
                            type="text"
                            className="border-2 border-gray-500 px-4 py-2 w-full"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">Publish Year</label>
                        <input 
                            type="text"
                            className="border-2 border-gray-500 px-4 py-2 w-full"
                            value={publishYear}
                            onChange={(e) => setPublishYear(e.target.value)}
                        />
                    </div>
                    <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
                        Save
                    </button>
                </div>
            )}
        </div>
    )
}

export default EditBook