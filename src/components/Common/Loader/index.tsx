import { ClipLoader } from 'react-spinners'
import './Loader.scss'

export default function Loader() {
  return (
    <div className="loader-container">
      <ClipLoader color="#f39c12" size={50} />
    </div>
  )
}
