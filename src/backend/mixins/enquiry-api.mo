import Types "../types/enquiry";
import EnquiryLib "../lib/enquiry";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

mixin (enquiries : List.List<Types.Enquiry>, nextId : Nat) {
  public func submitEnquiry(
    name : Text,
    phone : Text,
    email : Text,
    course : Text,
    city : Text,
    message : Text,
  ) : async Nat {
    Runtime.trap("not implemented");
  };

  public query func getEnquiries() : async [Types.Enquiry] {
    Runtime.trap("not implemented");
  };

  public query func getEnquiryCount() : async Nat {
    Runtime.trap("not implemented");
  };
};
