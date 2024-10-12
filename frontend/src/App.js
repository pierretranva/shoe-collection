import './App.css';

function Insert() {
  return (
    <button>
      Insert
    </button>
  );
}

function Delete() {
  return (
    <button>
      Delete
    </button>
  );
}

function Update() {
  return (
    <button>
      Update
    </button>
  );
}

export default function MyApp() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome Admin</h1>
        <h2>Please select the desired operation below</h2>
        <div className="button">
          <Insert />
          <Delete /> 
          <Update />
        </div>
      </header>
    </div>
  );
}
