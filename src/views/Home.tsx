import React from "react";
import AuthContext from "../AuthContext";
import { Header, Input } from "semantic-ui-react";

function Home() {
  const authObject = React.useContext(AuthContext);
  const user = authObject.idTokenPayload.name;

  return (
    <div className="home">
      <Header as="h2" textAlign="center" className="brandBlue">
        Welcome to boxwise, {user || `please log in`}.
      </Header>

      {user ? (
        <div>
          <div className="child1">
            <div>
              <Header as="h2" className="brandBlue">
                FIND BOXES
              </Header>
              <Input size="large" className="brandBlue" action="Search" placeholder="Search..." />
            </div>
          </div>

          <div className="child2">
            <Header as="h2" className="white">
              ORDERS
            </Header>
            <div className="card">
              <div className="column-less">
                <h3>
                  3
                  <br />
                  boxes
                </h3>
              </div>
              <div className="column">
                <p className="brandBlue">Ordered 4 hours ago by Samantha S.</p>
              </div>
            </div>

            <div className="card">
              <div className="column-less">
                <h3 className="brandBlue">
                  3<br></br> boxes
                </h3>
              </div>
              <div className="column">
                <p>Ordered 4 hours ago by Samantha S.</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Home;
