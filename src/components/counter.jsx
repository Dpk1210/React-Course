import React, { Component } from "react";

class Counters extends Component {
  state = {
    count: 0,
    tags: ["tag1", "tag2", "tag3"]
  };
  renderTags() {
    if (this.state.tags.length === 0) return <p>There are no tag!</p>;
    return (
      <ul>
        {this.state.tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }

  handleIncrement = () => {
    console.log(this.setState({ count: this.state.count + 1 }));
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={this.handleIncrement}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        <div>
          {this.state.tags.length === 0 && "Please create a new tag!"}
          {this.renderTags()}
        </div>
      </div>
    );
  }
  formatCount() {
    const { count } = this.state;
    return count === 0 ? "Zero" : count;
  }

  getBadgeClasses() {
    const { count } = this.state;
    let classes = "badge m-2 badge-";
    classes += count === 0 ? "warning " : "primary";
    return classes;
  }
}

export default Counters;
