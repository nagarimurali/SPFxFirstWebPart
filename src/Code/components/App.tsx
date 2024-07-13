/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { sp } from "@pnp/sp/presets/all"; 
import { TextField } from "@fluentui/react/lib/TextField";
import { useEffect, useState } from "react";
import { IEmployee } from "../interface/IEmployee";
import { PrimaryButton } from "@fluentui/react/lib/components/Button/PrimaryButton/PrimaryButton";

import { getSP } from "../pnpConfig";

const App = (props: any) => {
  const [items, setItems] = useState<IEmployee[]>([]);
  // const [EventsRgs, setEventsRgs] = useState<IEventRgs[]>([]);
  const _sp = getSP(props.context);
  console.log("props", props);
  const [employee, setEmployee] = useState<IEmployee>({
    Id: 0,
    Title: "",
    Ower: "",
    OwerId: 0,
  });
  const LIST_NAME = "EmployeeDetails";
  // let _sp: SPFI = getSP(props.context);
  const getRegistration = async () => {
    console.log("contrex,", _sp);
    const itemdata = await _sp.web.lists.getByTitle(LIST_NAME).items();
    const items1: any[] = await sp.web.lists
      .getByTitle("EmployeeDetails")
      .items.select("*", "Ower/Title")
      .expand("Ower/ID")
      .get();
    console.log("-sp", itemdata);
    setItems(itemdata);

    console.log("items", items1);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getRegistration();
    };
    fetchData();
  }, []);
  const handleChange = (key: any, value: any) => {
    setEmployee((proveData) => ({
      ...proveData,
      [key]: value,
    }));
  };
  const hadleSumbit = async (event: any) => {
    event.preventDefault();

    console.log(employee);

    try {
      const inputData = {
        Title: employee.Title,
        OwerId: employee.OwerId,
      };
      await _sp.web.lists.getByTitle("EmployeeDetails").items.add(inputData);
      alert("Success");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div>
        <div style={{ width: "300px", margin: "3px" }}>
          <TextField
            placeholder="Enter Title"
            name="Title"
            value={employee.Title}
            onChange={(event, value) => handleChange("Title", value)}
          />
        </div>
        <div style={{ width: "300px", margin: "3px" }}>
          <PeoplePicker
            context={props.context}
            personSelectionLimit={1}
            principalTypes={[PrincipalType.User]}
            placeholder="Enter ower name"
            ensureUser={true}
            onChange={async (items) => {
              const value = items.length > 0 ? Number(items[0].id) : 0;
              setEmployee({
                ...employee,
                ["OwerId"]: value,
              });
            }}
          />
        </div>
        <div>
          <PrimaryButton onClick={hadleSumbit}>Save</PrimaryButton>
        </div>
      </div>
      <div>
        {items &&
          items.length > 0 &&
          items.map((eve: any) => {
            console.log("eve", eve);
            return (
              <div>
                {eve.Title},{eve.OwerId},{eve.Ower}
              </div>
            );
          })}
      </div>
    </>
  );
};
export default App;
