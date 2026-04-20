import Types "../types/enquiry";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

module {
  public type Enquiry = Types.Enquiry;

  public func submit(
    enquiries : List.List<Enquiry>,
    nextId : Nat,
    name : Text,
    phone : Text,
    email : Text,
    course : Text,
    city : Text,
    message : Text,
    timestamp : Int,
  ) : Nat {
    Runtime.trap("not implemented");
  };

  public func listAll(enquiries : List.List<Enquiry>) : [Enquiry] {
    Runtime.trap("not implemented");
  };

  public func count(enquiries : List.List<Enquiry>) : Nat {
    Runtime.trap("not implemented");
  };
};
