import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi aspernatur dolorum eveniet fuga id sed
                suscipit. Aliquam amet delectus deleniti dolorem illo necessitatibus placeat quaerat, repellat, similique, tempore
                ullam vel vitae voluptate! Amet aperiam assumenda atque dicta doloremque, dolores ducimus esse, eum eveniet hic
                impedit incidunt ipsum laborum libero maiores maxime nisi odio officiis possimus, quae qui quos similique soluta
                suscipit tempora vel veritatis. Aliquam aliquid commodi dicta eius et, eum eveniet facere facilis magnam mollitia
                neque, nulla repudiandae voluptates! Doloremque excepturi hic impedit ipsa iste, molestiae molestias nihil
                ratione? A consequuntur dicta id iure laboriosam neque tempora. Ab commodi consequatur distinctio, ducimus error
                fuga ipsum necessitatibus numquam possimus voluptas. Aspernatur beatae cum deserunt, ea eius eos est et expedita
                illum in modi obcaecati, officiis placeat repudiandae rerum, ullam ut voluptate voluptates? Architecto atque
                dolore quo. A aliquam atque cum debitis dicta dignissimos dolor enim error et exercitationem facere harum illo
                incidunt, ipsa ipsam iure laboriosam magnam maiores minima molestias odit omnis optio perspiciatis quae quod quos
                reprehenderit repudiandae sapiente sed tenetur totam ullam velit voluptatum. Incidunt laboriosam nostrum
                repudiandae saepe voluptas. Distinctio doloribus dolorum ducimus eveniet id iste laborum magni, minima modi
                molestias natus nihil nulla placeat quo ratione sapiente voluptas? Aperiam autem cupiditate delectus, dicta dolore
                eaque esse ex fugit in ipsam iure libero maxime minima necessitatibus nemo nobis officia perspiciatis placeat quam
                quis quos recusandae rem rerum voluptates voluptatum. Aliquid autem cumque, delectus deserunt dolorem fugit illo
                labore laboriosam maiores minima mollitia, nesciunt nostrum optio quidem, vel! Aperiam cum harum in laudantium
                natus quasi quidem quis recusandae ut? A aspernatur consectetur consequatur dignissimos, ex, facilis laboriosam
                neque odio porro quasi quia sed sequi, sit totam voluptate? Aliquam animi aperiam debitis doloribus ea, eius hic
                illo ipsum magni maxime neque nobis nostrum provident quam rem repellendus similique tempora, tempore tenetur
                veritatis? Asperiores atque aut beatae blanditiis debitis deserunt, distinctio dolore ea earum est eveniet
                excepturi ipsam modi molestiae non placeat, provident recusandae repellat repellendus saepe sunt vitae voluptatem.
                Alias at beatae consectetur doloribus eaque, fuga, ipsa magnam minima minus optio quaerat quam saepe similique,
                totam voluptates. Accusamus alias aperiam aspernatur at cupiditate debitis doloribus eaque earum enim eveniet
                explicabo illo itaque labore libero minus necessitatibus optio pariatur perspiciatis, placeat, porro quod
                reiciendis, repellendus sint suscipit voluptas. Accusamus aliquam, aliquid animi beatae commodi deleniti dolorem,
                facilis hic ipsa iure labore magnam maiores minus molestias nemo officia officiis porro quae quam quidem, quisquam
                quod ratione voluptas? A accusamus adipisci aliquam aliquid asperiores at autem cum dolorem dolorum ea eveniet
                exercitationem facere, fugiat incidunt inventore ipsum labore laudantium magni neque non nostrum optio porro quam
                quidem quod rem repellat repudiandae soluta tempora tempore unde vitae voluptate voluptatibus. A corporis ex
                libero maxime nemo quaerat quod sunt! Eligendi harum perspiciatis quae. Accusamus accusantium aut, corporis
                delectus, eaque facere hic illo illum impedit ipsam, labore minima officia rem repellendus sapiente sed vel.
                Adipisci alias aliquid cupiditate dignissimos doloremque doloribus est, fugit impedit ipsa modi mollitia officia,
                qui quis, quisquam temporibus vel voluptates.
              </div>
            }
          />
          <Route path="*" element={<div>404!</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
