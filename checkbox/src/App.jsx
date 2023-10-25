import obj from "./assets/data";
import { useState } from "react";

function changeTreeValue(id, data, setData) {
  let modified = data.map((element, idx) => {
    if (element.id === id) {
      element.value = !element.value;
      return element;
    } else {
      return element;
    }
  });
  if (id === "class" && data[0].value) {
    modified = data.map((element, idx) => {
      element.children.map((section, idx) => {
        section.value = true;
        section.children.map((student) => {
          student.value = true;
          return student;
        });
        return section;
      });
      return element;
    });
  } else {
    modified = data.map((element, idx) => {
      element.children.map((section, idx) => {
        section.value = false;
        section.children.map((student) => {
          student.value = false;
          return student;
        });
        return section;
      });
      return element;
    });
  }
  setData(modified);
}

function handleSectionChange(id, data, setData) {
  let modified = data.map((element, idx) => {
    element.children.map((section, idx) => {
      if (section.id === id) {
        section.value = !section.value;
        section.children.map((student) => {
          student.value = section.value;
          return student;
        });
      }
      return section;
    });
    return element;
  });
  setData(modified);
  modified = data.map((element, idx) => {
    let count = 0;
    element.children.map((child) => {
      if (child.value === true) count++;
      return child;
    });
    if (count === element.children.length) element.value = true;
    else {
      element.value = false;
    }
    return element;
  });
  setData(modified);
}

function handleSingleStudent(id, data, setData) {
 
  let modified = data.map((element, idx) => {
    element.children.map((section, idx) => {
      section.children.map((student) => {
        if (student.id === id) {
          student.value = !student.value;
        }
        return student;
      });
      return section;
    });
    return element;
  });
  setData(modified);
  modified = data.map((element, idx) => {
    element.children.map((section, idx) => {
      let count = 0;
      section.children.map((child) => {
        if (child.value === true) count++;
        return child;
      });
      if (count === section.children.length) section.value = true;
      else {
        section.value = false;
      }
      return section;
    });
    return element;
  });
  setData(modified);
  handleSectionChange("", data, setData);
}

export default function App() {
  const [data, setData] = useState(obj);
  const handleCheck = (id) => {
    console.log(id);
    changeTreeValue(id, obj, setData);
  };

  return (
    <div classid="App">
      {data.map((element, idx) => (
        <>
          <div>
            <div style={{ display: "flex" }}>
              <h4>Class</h4>
              <input
                type="checkbox"
                checked={element.value === true}
                onChange={() => handleCheck(element.id)}
              />
            </div>
          </div>
          {element.children.map((section, idx) => (
            <>
              <div style={{ marginLeft: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <h4>Section</h4>
                  <input
                    type="checkbox"
                    checked={section.value === true}
                    onChange={() => {
                      handleSectionChange(section.id, data, setData);
                    }}
                  />
                </div>
              </div>
              {section.children.map((student) => (
                <div>
                  <input
                    type="checkbox"
                    checked={student.value === true}
                    onChange={() => {
                      handleSingleStudent(student.id, data, setData);
                    }}
                  />
                </div>
              ))}
            </>
          ))}
        </>
      ))}
    </div>
  );
}