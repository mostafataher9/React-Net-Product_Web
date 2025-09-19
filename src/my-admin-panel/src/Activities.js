import {Users} from '../../Components/login';
import {products} from '../../App';


export function Activities() {
    const activities = [{
       id: 1,
       activity: "Users Count",
       content: "Users: " + Users.filter(u => u.role === "user").length
    },
    {
        id: 2,
        activity: "Editors Count",
        content: "Editors: " + Users.filter(u => u.role === "editor").length
    },
    {
        id: 3,
        activity: "Products Sold",
        content: "Products Sold: " + products.reduce((total, p) => total + (10 - p.stockCount), 0)
    }];
    return (
            <>
                  <h2>Activities</h2>
                  <ul>
                      {activities.map((activity, index) => (
                          <li key={index}>{activity}</li>
                      ))}
                  </ul>
                  <p>List of activities...</p>
            </>
      );
}
