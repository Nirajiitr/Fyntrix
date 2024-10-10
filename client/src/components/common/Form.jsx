import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  
}) => {
  const renderInputsByComponentType = (controlItem) => {
    let element = null;
    const value = formData[controlItem.name] || "";
    if (controlItem.componentType === "input") {
      element = (
        <Input
          name={controlItem.name}
          placeholder={controlItem.placeholder}
          id={controlItem.name}
          type={controlItem.type}
          value={value}
          onChange={(e) =>
            setFormData({ ...formData, [controlItem.name]: e.target.value })
          }
        />
      );
    } else if (controlItem.componentType === "textarea") {
      element = (
        <Textarea
          name={controlItem.name}
          placeholder={controlItem.placeholder}
          id={controlItem.id}
          value={value}
          onChange={(e) =>
            setFormData({ ...formData, [controlItem.name]: e.target.value })
          }
        />
      );
    } else if (controlItem.componentType === "select") {
      element = (
        <Select
          value={value}
          onValueChange={(value) =>
            setFormData({ ...formData, [controlItem.name]: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={controlItem.label} />
          </SelectTrigger>
          <SelectContent>
            {controlItem.options &&
              controlItem.options.length > 0 &&
              controlItem.options.map((optionItem) => (
                <SelectItem key={optionItem.id} value={optionItem.id}>
                  {optionItem.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      );
    } else {
      element = (
        <Input
          name={controlItem.name}
          placeholder={controlItem.placeholder}
          id={controlItem.name}
          type={controlItem.type}
          value={value}
          onChange={(e) =>
            setFormData({ ...formData, [controlItem.name]: e.target.value })
          }
        />
      );
    }
    return element;
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls &&
          formControls.map((controlItem) => (
            <div className="grid w-full gap-1.5 " key={controlItem.name}>
              <label className="mb-1">{controlItem.label}</label>
              {renderInputsByComponentType(controlItem)}
            </div>
          ))}
      </div>
      <Button  type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
