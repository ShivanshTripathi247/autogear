import React from 'react';
import Workflow from './workflow';

type Props = {};

const Workflows = (props: Props) => {
  return (
    <div className="relative flex flex-col gap-4">
      <section className="flex flex-col m-2">
        <Workflow
          description="Creating a test Workflow"
          id="eowhf0392"
          name="Automation Workflow"
          publish={true} // Replace with the appropriate value
        />
      </section>
    </div>
  );
};

export default Workflows;
