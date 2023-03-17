import React from "react";

export default function AlertMsg() {
  return (
    <div className="alert">
      <p>{message}</p>
      <style jsx>{`
        .alert {
          padding: 1rem;
          background-color: #fff;
          border-radius: 0.25rem;
          box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
        }
      `}</style>
    </div>
  );
}
