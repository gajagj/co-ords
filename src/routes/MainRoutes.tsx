import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'

function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRoutes
