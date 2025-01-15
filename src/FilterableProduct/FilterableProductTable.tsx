import { ChangeEvent, ChangeEventHandler, useState } from "react";
import "./index.css"
const dataSource = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

interface Product {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}

interface ProductTableProps {
  products: Product[];
  searchText: string;
  isStockedOnly: boolean;
}

interface ProductCategoryRowProps {
  category: string;
}

interface ProductRowProps {
  product: {
    name: string;
    price: string;
    stocked: boolean;
  }
}

interface SearchBarProps {
  searchText: string;
  isStockedOnly: boolean;
  onSearchTextChange: React.Dispatch<React.SetStateAction<string>>;
  onSetIsStockedOnly: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductCategoryRow: React.FC<ProductCategoryRowProps> = ({category}) => {
  return <tr className="category">
    <th colSpan={2}>{category}</th>
  </tr>
}

const ProductRow: React.FC<ProductRowProps> = ({product}) => {
  return (
    <tr>
      <td style={{color: product.stocked ? '' : 'red'}}>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  )
}

const SearchBar: React.FC<SearchBarProps> = ({searchText, isStockedOnly, onSearchTextChange, onSetIsStockedOnly}) => {
  return <>
    <input type="text" placeholder="Search..." value={searchText} onChange={(e) => onSearchTextChange(e.target.value)}/>
    <div>
      <input type="checkbox" checked={isStockedOnly} onChange={(e) => onSetIsStockedOnly(e.target.checked)}/>
      <label>Only show products in stock</label>
    </div>
  </>
}

const ProductTable: React.FC<ProductTableProps> = ({products, searchText, isStockedOnly}) => {
  const rows:React.ReactNode[] = [];
  let lastCategory: string;
  products.forEach(product => {
    if(product.name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) === -1) {
      return;
    }
    if(isStockedOnly && !product.stocked) {
      return; 
    }
    if(product.category !== lastCategory) {
      rows.push(<ProductCategoryRow key={product.category} category={product.category } />)
    }
    rows.push(<ProductRow key={product.name} product={product} />)
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

const FilterableProductTable = () => {
  const [searchText, setSearchText] = useState("");
  const [isStockedOnly, setIsStockedOnly] = useState(false);
  return (
    <div className="filterableProductTableBox">
      <SearchBar searchText={searchText} isStockedOnly={isStockedOnly} onSearchTextChange={setSearchText} onSetIsStockedOnly={setIsStockedOnly}/>
      <ProductTable products={dataSource} searchText={searchText} isStockedOnly={isStockedOnly}/>
    </div>
  )
}

export default FilterableProductTable;