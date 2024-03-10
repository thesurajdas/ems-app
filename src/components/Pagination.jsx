import { LuArrowRight, LuArrowLeft } from 'react-icons/lu';

export default function Pagination({ page, setPage, totalPage }) {
    const activePage = (currPage) => {
        if (page == currPage) {
            return (" dark:bg-gray-800 text-blue-500 bg-blue-100/60")
        }
        else {
            return (" text-gray-500 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100")
        }
    }
    return (
        <>
            <button type="button" onClick={() => setPage(page - 1)} disabled={page <= 1} className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                <LuArrowLeft />
                <span>previous</span>
            </button>
            <div className="items-center hidden md:flex gap-x-3">
                {Array(totalPage).fill(0).map((e, id) => (
                    <button key={id} type="button" onClick={() => setPage(id + 1)} className={"px-2 py-1 text-sm rounded-md" + activePage(id + 1)}>{id + 1}</button>
                ))}
            </div>
            <button type="button" onClick={() => setPage(page + 1)} disabled={totalPage <= page} className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                <span>Next</span>
                <LuArrowRight />
            </button>
        </>
    )
}
