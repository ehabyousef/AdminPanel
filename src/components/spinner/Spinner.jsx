import React from "react";

export default function Spinner() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="spinner-border text-text-light-subtle spinner-border-sm fs-1" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
