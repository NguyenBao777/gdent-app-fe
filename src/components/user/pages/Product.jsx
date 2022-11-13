import { useEffect, useState } from 'react'
import { Header } from '../../../components';
import { getAllCategory, getAllProduct, getProductByCategory } from '../../../utils/hepperApi';
import { ProductItem } from '../product/ProductContainer';
import { Pagination } from "../../../components";
import LoadingImage from "../../../assets/img/loading.gif"

const Product = () => {
    const [listCategory, setListCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categoryID, setcategoryID] = useState(null);
    const [listProduct, setListProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    // get currentPage
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItem = listProduct.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        setLoading(true);
        getAllCategory().then((res) => {
            if (res.data.success) {
                setListCategory(res.data.message);
                getProductByCategory(res.data.message[0].id).then((res) => {
                    if (res.data.success) {
                        setListProduct(res.data.message);
                    }
                });
                setcategoryID(res.data.message[0].id);
                setLoading(false);
            }
        })
    }, []);

    const filterByCategory = (category) => {
        getProductByCategory(category.id).then((res) => {
            if (res.data.success) {
                setListProduct(res.data.message);
                setcategoryID(category.id);
            }
        });

    }

    return (
        <div className="w-full">
            <Header />

            {loading ? (
                <div className="absolute z-30  top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-white">
                    <img src={LoadingImage} className="object-cover w-full h-full" />
                </div>

            ) : (
                <div className="mt-24 w-full flex flex-col gap-4 py-2 relative">
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {listCategory.length > 0 && listCategory.map((category, i) => (
                            <div key={i} className={`w-150 rounded-full cursor-pointer shadow-md text-white text-sm flex items-center justify-center py-1 px-2 ${categoryID === category.id ? "bg-orange-600" : "bg-green-600"} transition-all duration-150 capitalize`}
                                onClick={() => filterByCategory(category)}
                            >
                                {category.category_name}
                            </div>
                        ))}
                    </div>


                    <div className="flex flex-wrap items-center gap-4 px-2">
                        {currentItem.length > 0 && currentItem.map((product, index) => (
                            <ProductItem data={product} key={index} />
                        ))}
                    </div>
                    <Pagination itemsPerPage={itemsPerPage} totalPages={listProduct.length} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>
            )}
        </div>
    )
}

export default Product